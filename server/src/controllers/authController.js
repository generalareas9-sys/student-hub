import prisma from '../config/db.js';
import { hashPassword, comparePassword, signToken } from '../utils/auth.js';
import { logAudit } from '../utils/logger.js';
import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    fullName: z.string().min(2, 'Full name is required'),
    studentId: z.string().optional(),
    major: z.string().optional(),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
  }),
});

export async function register(req, res, next) {
  try {
    const { email, password, fullName, studentId, major } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: 'An account with this email already exists.',
      });
    }

    const passwordHash = await hashPassword(password);
    const generatedStudentId = studentId || `STU-${Math.floor(100000 + Math.random() * 900000)}`;

    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        passwordHash,
        role: 'STUDENT',
        profile: {
          create: {
            fullName,
            studentId: generatedStudentId,
            major: major || 'Computer Science',
            avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          },
        },
      },
      include: { profile: true },
    });

    // Create a default welcome notification
    await prisma.notification.create({
      data: {
        userId: user.id,
        title: 'Welcome to Student Hub!',
        message: 'Your account is ready. Explore your courses, track your study hours, and check assignments.',
        type: 'SUCCESS',
      },
    });

    // Automatically enroll new student in sample courses so they have a functioning dashboard immediately
    const availableCourses = await prisma.course.findMany({ take: 4 });
    for (const course of availableCourses) {
      await prisma.enrollment.create({
        data: {
          userId: user.id,
          courseId: course.id,
          status: 'ACTIVE',
        },
      });
    }

    const token = signToken({ userId: user.id, role: user.role });

    res.cookie('student_hub_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    await logAudit({
      userId: user.id,
      action: 'USER_REGISTER',
      entity: 'User',
      entityId: user.id,
      details: { email: user.email },
      ipAddress: req.ip,
    });

    const { passwordHash: _, ...safeUser } = user;
    res.status(201).json({
      success: true,
      token,
      user: safeUser,
      message: 'Registration successful!',
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      include: { profile: true },
    });

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password.',
      });
    }

    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password.',
      });
    }

    const token = signToken({ userId: user.id, role: user.role });

    res.cookie('student_hub_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    await logAudit({
      userId: user.id,
      action: 'USER_LOGIN',
      entity: 'User',
      entityId: user.id,
      ipAddress: req.ip,
    });

    const { passwordHash: _, ...safeUser } = user;
    res.json({
      success: true,
      token,
      user: safeUser,
      message: 'Login successful!',
    });
  } catch (error) {
    next(error);
  }
}

export async function getMe(req, res, next) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: {
        profile: true,
        _count: {
          select: {
            enrollments: true,
            notifications: { where: { isRead: false } },
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found.' });
    }

    const { passwordHash, ...safeUser } = user;
    res.json({ success: true, user: safeUser });
  } catch (error) {
    next(error);
  }
}

export async function logout(req, res) {
  res.clearCookie('student_hub_token');
  res.json({ success: true, message: 'Logged out successfully.' });
}

export async function changePassword(req, res, next) {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        error: 'New password must be at least 6 characters long.',
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });

    const isMatch = await comparePassword(currentPassword, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        error: 'Incorrect current password.',
      });
    }

    const passwordHash = await hashPassword(newPassword);
    await prisma.user.update({
      where: { id: req.user.id },
      data: { passwordHash },
    });

    await logAudit({
      userId: req.user.id,
      action: 'PASSWORD_CHANGE',
      entity: 'User',
      entityId: req.user.id,
      ipAddress: req.ip,
    });

    res.json({ success: true, message: 'Password updated successfully.' });
  } catch (error) {
    next(error);
  }
}

export async function forgotPassword(req, res, next) {
  try {
    const { email } = req.body;
    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    // Safe response without exposing user existence
    res.json({
      success: true,
      message: 'If an account exists with this email, password reset instructions have been sent.',
    });
  } catch (error) {
    next(error);
  }
}
