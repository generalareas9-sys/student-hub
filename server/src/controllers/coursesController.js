import prisma from '../config/db.js';

export async function getCourses(req, res, next) {
  try {
    const userId = req.user.id;

    // Fetch courses with enrollment status for this student
    const courses = await prisma.course.findMany({
      include: {
        enrollments: {
          where: { userId },
        },
        _count: {
          select: { assignments: true, enrollments: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const formatted = courses.map((course) => {
      const enrollment = course.enrollments[0];
      return {
        id: course.id,
        code: course.code,
        title: course.title,
        description: course.description,
        instructorName: course.instructorName,
        credits: course.credits,
        progressPercent: course.progressPercent,
        color: course.color,
        semester: course.semester,
        isEnrolled: !!enrollment,
        enrollmentStatus: enrollment ? enrollment.status : 'NOT_ENROLLED',
        assignmentCount: course._count.assignments,
        studentCount: course._count.enrollments,
      };
    });

    res.json({ success: true, data: formatted });
  } catch (error) {
    next(error);
  }
}

export async function getCourseById(req, res, next) {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        assignments: {
          orderBy: { dueDate: 'asc' },
        },
        enrollments: {
          where: { userId },
        },
        _count: {
          select: { enrollments: true },
        },
      },
    });

    if (!course) {
      return res.status(404).json({ success: false, error: 'Course not found.' });
    }

    res.json({
      success: true,
      data: {
        ...course,
        isEnrolled: course.enrollments.length > 0,
        studentCount: course._count.enrollments,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function enrollCourse(req, res, next) {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const existing = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: { userId, courseId: id },
      },
    });

    if (existing) {
      return res.status(400).json({ success: false, error: 'Already enrolled in this course.' });
    }

    const enrollment = await prisma.enrollment.create({
      data: {
        userId,
        courseId: id,
        status: 'ACTIVE',
      },
      include: { course: true },
    });

    res.status(201).json({
      success: true,
      data: enrollment,
      message: `Enrolled successfully in ${enrollment.course.title}!`,
    });
  } catch (error) {
    next(error);
  }
}

export async function createCourse(req, res, next) {
  try {
    const { code, title, description, instructorName, credits, color, semester } = req.body;

    const course = await prisma.course.create({
      data: {
        code,
        title,
        description,
        instructorName: instructorName || req.user.profile?.fullName || 'Faculty Instructor',
        credits: credits ? parseInt(credits) : 3,
        color: color || '#5048e5',
        semester: semester || 'Fall 2026',
      },
    });

    res.status(201).json({ success: true, data: course, message: 'Course created successfully.' });
  } catch (error) {
    next(error);
  }
}
