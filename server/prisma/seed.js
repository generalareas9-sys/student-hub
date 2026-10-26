import dotenv from 'dotenv';
dotenv.config();

import prisma from '../src/config/db.js';
import { hashPassword } from '../src/utils/auth.js';

async function main() {
  console.log('🌱 Seeding database with realistic academic data...');

  // Clean existing records in reverse dependency order
  await prisma.auditLog.deleteMany({});
  await prisma.message.deleteMany({});
  await prisma.notification.deleteMany({});
  await prisma.calendarEvent.deleteMany({});
  await prisma.studySession.deleteMany({});
  await prisma.grade.deleteMany({});
  await prisma.submission.deleteMany({});
  await prisma.assignment.deleteMany({});
  await prisma.enrollment.deleteMany({});
  await prisma.course.deleteMany({});
  await prisma.profile.deleteMany({});
  await prisma.user.deleteMany({});

  const defaultPasswordHash = await hashPassword('password123');

  // 1. Create Demo Student
  const studentUser = await prisma.user.create({
    data: {
      email: 'student@studenthub.edu',
      passwordHash: defaultPasswordHash,
      role: 'STUDENT',
      profile: {
        create: {
          fullName: 'Alex Morgan',
          studentId: 'STU-948201',
          major: 'Human Computer Interaction & Software Engineering',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          bio: 'Passionate design and engineering student focused on accessible web interfaces.',
          phone: '+1 (555) 234-5678',
          address: '42 Campus Way, University Park, CA',
          yearOfStudy: 'Junior',
        },
      },
    },
    include: { profile: true },
  });

  // 2. Create Demo Instructor
  const instructorUser = await prisma.user.create({
    data: {
      email: 'instructor@studenthub.edu',
      passwordHash: defaultPasswordHash,
      role: 'INSTRUCTOR',
      profile: {
        create: {
          fullName: 'Dr. Sarah Jenkins',
          studentId: 'FAC-10023',
          major: 'Computer Science Faculty',
          avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
          bio: 'Professor of HCI and Interactive Computing Systems.',
        },
      },
    },
  });

  console.log('👤 Created demo student and instructor users.');

  // 3. Create Courses
  const coursesData = [
    {
      code: 'CS301',
      title: 'Human Computer Interaction',
      description: 'Principles of human-centered software design, usability heuristics, cognitive models, and interactive prototyping.',
      instructorName: 'Dr. Sarah Jenkins',
      credits: 4,
      progressPercent: 82,
      color: '#5048e5',
      semester: 'Fall 2026',
    },
    {
      code: 'CS204',
      title: 'Data Structures & Algorithms',
      description: 'Advanced data structures, tree & graph traversals, dynamic programming, and complexity analysis.',
      instructorName: 'Prof. Marcus Vance',
      credits: 4,
      progressPercent: 68,
      color: '#0b5cab',
      semester: 'Fall 2026',
    },
    {
      code: 'DES102',
      title: 'UI/UX Design Fundamentals',
      description: 'Visual hierarchy, typography, design systems, wireframing, color theory, and responsive layout design.',
      instructorName: 'Elena Rostova',
      credits: 3,
      progressPercent: 94,
      color: '#e8734a',
      semester: 'Fall 2026',
    },
    {
      code: 'SWE405',
      title: 'Software Engineering Practices',
      description: 'Modern agile software development, automated testing, continuous integration, and clean code architecture.',
      instructorName: 'David Chen',
      credits: 3,
      progressPercent: 55,
      color: '#2fb37c',
      semester: 'Fall 2026',
    },
  ];

  const createdCourses = [];
  for (const c of coursesData) {
    const course = await prisma.course.create({ data: c });
    createdCourses.push(course);

    // Enroll student in all 4 courses
    await prisma.enrollment.create({
      data: {
        userId: studentUser.id,
        courseId: course.id,
        status: 'ACTIVE',
      },
    });
  }

  console.log(`📚 Created ${createdCourses.length} courses with student enrollments.`);

  // 4. Create Assignments
  const now = new Date();
  const in3Days = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
  const in5Days = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000);
  const in10Days = new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000);
  const past5Days = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000);

  const a1 = await prisma.assignment.create({
    data: {
      courseId: createdCourses[0].id, // CS301
      title: 'User Interface Usability Heuristics Report',
      description: 'Perform a comprehensive Nielsen Norman heuristic evaluation of a live web application, highlighting severity ratings and proposed redesigns.',
      dueDate: in3Days,
      maxScore: 100,
      weight: 20,
      status: 'IN_PROGRESS',
    },
  });

  const a2 = await prisma.assignment.create({
    data: {
      courseId: createdCourses[1].id, // CS204
      title: 'Binary Search Tree & Graph Traversal Implementation',
      description: 'Implement AVL tree rebalancing and Dijkstra shortest-path algorithms in TypeScript/Python with comprehensive test assertions.',
      dueDate: in5Days,
      maxScore: 100,
      weight: 25,
      status: 'NOT_STARTED',
    },
  });

  const a3 = await prisma.assignment.create({
    data: {
      courseId: createdCourses[2].id, // DES102
      title: 'Interactive High-Fidelity Mobile Prototype',
      description: 'Design a mobile design system with responsive tokens, component states, and micro-interactions.',
      dueDate: past5Days,
      maxScore: 100,
      weight: 20,
      status: 'GRADED',
    },
  });

  const a4 = await prisma.assignment.create({
    data: {
      courseId: createdCourses[3].id, // SWE405
      title: 'CI/CD Pipeline Integration & Automated Testing',
      description: 'Configure GitHub Actions workflow for linting, testing, Docker build, and cloud staging deployment.',
      dueDate: in10Days,
      maxScore: 100,
      weight: 15,
      status: 'SUBMITTED',
    },
  });

  // 5. Create Submissions & Grades
  await prisma.submission.create({
    data: {
      assignmentId: a3.id,
      userId: studentUser.id,
      submittedAt: past5Days,
      content: 'Figma prototype submission link with interactive component variants and tokens.',
      status: 'GRADED',
    },
  });

  await prisma.grade.create({
    data: {
      userId: studentUser.id,
      courseId: createdCourses[2].id,
      assignmentId: a3.id,
      score: 96,
      maxScore: 100,
      letterGrade: 'A',
      feedback: 'Outstanding typography hierarchy and crisp component states.',
    },
  });

  await prisma.submission.create({
    data: {
      assignmentId: a4.id,
      userId: studentUser.id,
      submittedAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
      content: 'Repository link containing passing GitHub Actions pipeline and test reports.',
      status: 'SUBMITTED',
    },
  });

  // Additional Grades for GPA calculation
  await prisma.grade.create({
    data: {
      userId: studentUser.id,
      courseId: createdCourses[0].id,
      score: 92,
      maxScore: 100,
      letterGrade: 'A',
      feedback: 'Solid analysis and user-centric problem definition.',
    },
  });

  await prisma.grade.create({
    data: {
      userId: studentUser.id,
      courseId: createdCourses[1].id,
      score: 88,
      maxScore: 100,
      letterGrade: 'B+',
      feedback: 'Well-optimized time complexity. Good test coverage.',
    },
  });

  // 6. Study Sessions (for study hours chart)
  const studySessionDates = [
    { daysAgo: 6, mins: 270 }, // 4.5 hrs Mon
    { daysAgo: 5, mins: 360 }, // 6.0 hrs Tue
    { daysAgo: 4, mins: 210 }, // 3.5 hrs Wed
    { daysAgo: 3, mins: 420 }, // 7.0 hrs Thu
    { daysAgo: 2, mins: 300 }, // 5.0 hrs Fri
    { daysAgo: 1, mins: 480 }, // 8.0 hrs Sat
    { daysAgo: 0, mins: 120 }, // 2.0 hrs Sun
  ];

  for (const s of studySessionDates) {
    const sDate = new Date(now.getTime() - s.daysAgo * 24 * 60 * 60 * 1000);
    await prisma.studySession.create({
      data: {
        userId: studentUser.id,
        courseId: createdCourses[0].id,
        durationMinutes: s.mins,
        sessionDate: sDate,
        notes: 'Focused study and coding session.',
      },
    });
  }

  // 7. Calendar Events
  const today10am = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0, 0);
  const today1130am = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 11, 30, 0);
  const today11am = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 11, 0, 0);
  const today1230pm = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 30, 0);
  const today12pm = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0);
  const today1330pm = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 13, 30, 0);

  await prisma.calendarEvent.createMany({
    data: [
      {
        userId: studentUser.id,
        title: 'Team Meetup',
        eventType: 'MEETUP',
        startTime: today10am,
        endTime: today1130am,
        color: '#e8734a',
        location: 'Study Room B / Zoom',
      },
      {
        userId: studentUser.id,
        title: 'HCI Lecture: User Research',
        eventType: 'CLASS',
        startTime: today11am,
        endTime: today1230pm,
        color: '#5048e5',
        location: 'Turing Hall 101',
      },
      {
        userId: studentUser.id,
        title: 'Algorithm Lab',
        eventType: 'CLASS',
        startTime: today12pm,
        endTime: today1330pm,
        color: '#2fb37c',
        location: 'CS Lab 3',
      },
    ],
  });

  // 8. Notifications
  await prisma.notification.createMany({
    data: [
      {
        userId: studentUser.id,
        title: 'Assignment Graded',
        message: 'Your Interactive High-Fidelity Mobile Prototype received 96/100 (Grade: A).',
        type: 'SUCCESS',
      },
      {
        userId: studentUser.id,
        title: 'Upcoming Deadline',
        message: 'User Interface Usability Heuristics Report is due in 3 days.',
        type: 'WARNING',
      },
      {
        userId: studentUser.id,
        title: 'Schedule Reminder',
        message: 'Team Meetup starts today at 10:00 AM.',
        type: 'INFO',
      },
    ],
  });

  // 9. Initial Chat Messages
  await prisma.message.create({
    data: {
      senderId: instructorUser.id,
      receiverId: studentUser.id,
      content: 'Hello Alex! Great work on the last prototype sprint. Let me know if you need any guidance on the upcoming heuristic evaluation.',
    },
  });

  console.log('✅ Database seeded successfully!');
  console.log('🔑 Login Credentials:');
  console.log('   Student:    student@studenthub.edu   / password123');
  console.log('   Instructor: instructor@studenthub.edu / password123');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
