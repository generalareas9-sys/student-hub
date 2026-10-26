import prisma from '../config/db.js';
import { logAudit } from '../utils/logger.js';

export async function getProfile(req, res, next) {
  try {
    const userId = req.user.id;

    const profile = await prisma.profile.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            role: true,
            createdAt: true,
          },
        },
      },
    });

    if (!profile) {
      return res.status(404).json({ success: false, error: 'Profile not found.' });
    }

    res.json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
}

export async function updateProfile(req, res, next) {
  try {
    const userId = req.user.id;
    const { fullName, major, bio, phone, address, yearOfStudy, avatarUrl } = req.body;

    const updated = await prisma.profile.upsert({
      where: { userId },
      update: {
        fullName: fullName || undefined,
        major: major || undefined,
        bio: bio !== undefined ? bio : undefined,
        phone: phone !== undefined ? phone : undefined,
        address: address !== undefined ? address : undefined,
        yearOfStudy: yearOfStudy || undefined,
        avatarUrl: avatarUrl || undefined,
      },
      create: {
        userId,
        fullName: fullName || 'Student',
        major: major || 'Computer Science',
        bio: bio || '',
        phone: phone || '',
        address: address || '',
        yearOfStudy: yearOfStudy || 'Sophomore',
        avatarUrl: avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      },
    });

    await logAudit({
      userId,
      action: 'PROFILE_UPDATE',
      entity: 'Profile',
      entityId: updated.id,
      details: req.body,
      ipAddress: req.ip,
    });

    res.json({ success: true, data: updated, message: 'Profile updated successfully!' });
  } catch (error) {
    next(error);
  }
}
