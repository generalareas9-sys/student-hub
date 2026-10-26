import prisma from '../config/db.js';

export async function getAssignments(req, res, next) {
  try {
    const userId = req.user.id;
    const { status, search } = req.query;

    const where = {};

    if (status && status !== 'all') {
      const normalizedStatus = status.toUpperCase().replace('-', '_');
      where.status = normalizedStatus;
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { course: { title: { contains: search } } },
      ];
    }

    const assignments = await prisma.assignment.findMany({
      where,
      include: {
        course: {
          select: {
            id: true,
            code: true,
            title: true,
            color: true,
          },
        },
        submissions: {
          where: { userId },
          take: 1,
        },
        grades: {
          where: { userId },
          take: 1,
        },
      },
      orderBy: { dueDate: 'asc' },
    });

    const formatted = assignments.map((a) => {
      const submission = a.submissions[0];
      const grade = a.grades[0];
      return {
        id: a.id,
        title: a.title,
        description: a.description,
        courseId: a.course.id,
        courseCode: a.course.code,
        courseTitle: a.course.title,
        courseColor: a.course.color,
        dueDate: a.dueDate,
        maxScore: a.maxScore,
        weight: a.weight,
        status: submission ? (grade ? 'GRADED' : 'SUBMITTED') : a.status,
        grade: grade ? `${grade.score}/${grade.maxScore}` : null,
        letterGrade: grade ? grade.letterGrade : null,
        submittedAt: submission ? submission.submittedAt : null,
      };
    });

    res.json({ success: true, data: formatted });
  } catch (error) {
    next(error);
  }
}

export async function getAssignmentById(req, res, next) {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const assignment = await prisma.assignment.findUnique({
      where: { id },
      include: {
        course: true,
        submissions: {
          where: { userId },
        },
        grades: {
          where: { userId },
        },
      },
    });

    if (!assignment) {
      return res.status(404).json({ success: false, error: 'Assignment not found.' });
    }

    res.json({
      success: true,
      data: {
        ...assignment,
        userSubmission: assignment.submissions[0] || null,
        userGrade: assignment.grades[0] || null,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function updateAssignmentStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await prisma.assignment.update({
      where: { id },
      data: { status: status.toUpperCase().replace('-', '_') },
    });

    res.json({ success: true, data: updated, message: 'Status updated.' });
  } catch (error) {
    next(error);
  }
}

export async function submitAssignment(req, res, next) {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { content, fileUrl } = req.body;

    // Check if submission already exists
    const existing = await prisma.submission.findFirst({
      where: { assignmentId: id, userId },
    });

    let submission;
    if (existing) {
      submission = await prisma.submission.update({
        where: { id: existing.id },
        data: {
          content: content || existing.content,
          fileUrl: fileUrl || existing.fileUrl,
          submittedAt: new Date(),
          status: 'SUBMITTED',
        },
      });
    } else {
      submission = await prisma.submission.create({
        data: {
          assignmentId: id,
          userId,
          content: content || 'Online Submission',
          fileUrl: fileUrl || null,
          status: 'SUBMITTED',
        },
      });
    }

    // Update assignment status
    await prisma.assignment.update({
      where: { id },
      data: { status: 'SUBMITTED' },
    });

    // Notify user
    await prisma.notification.create({
      data: {
        userId,
        title: 'Assignment Submitted',
        message: `Your submission for assignment has been received.`,
        type: 'SUCCESS',
      },
    });

    res.json({
      success: true,
      data: submission,
      message: 'Assignment submitted successfully!',
    });
  } catch (error) {
    next(error);
  }
}

export async function createAssignment(req, res, next) {
  try {
    const { courseId, title, description, dueDate, maxScore, weight } = req.body;

    const assignment = await prisma.assignment.create({
      data: {
        courseId,
        title,
        description,
        dueDate: new Date(dueDate),
        maxScore: maxScore ? parseFloat(maxScore) : 100,
        weight: weight ? parseFloat(weight) : 15,
        status: 'NOT_STARTED',
      },
      include: { course: true },
    });

    res.status(201).json({ success: true, data: assignment, message: 'Assignment created.' });
  } catch (error) {
    next(error);
  }
}
