import prisma from '../config/db.js';

export async function getMessages(req, res, next) {
  try {
    const userId = req.user.id;

    const messages = await prisma.message.findMany({
      where: {
        OR: [{ senderId: userId }, { receiverId: userId }],
      },
      include: {
        sender: {
          select: {
            id: true,
            email: true,
            profile: { select: { fullName: true, avatarUrl: true } },
          },
        },
        receiver: {
          select: {
            id: true,
            email: true,
            profile: { select: { fullName: true, avatarUrl: true } },
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    res.json({ success: true, data: messages });
  } catch (error) {
    next(error);
  }
}

export async function sendMessage(req, res, next) {
  try {
    const senderId = req.user.id;
    const { receiverId, content } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({ success: false, error: 'Message cannot be empty.' });
    }

    // Default receiver if not specified: the admin/support agent or peer
    let targetId = receiverId;
    if (!targetId) {
      const otherUser = await prisma.user.findFirst({
        where: { id: { not: senderId } },
      });
      targetId = otherUser ? otherUser.id : senderId;
    }

    const message = await prisma.message.create({
      data: {
        senderId,
        receiverId: targetId,
        content: content.trim(),
      },
      include: {
        sender: {
          select: {
            id: true,
            email: true,
            profile: { select: { fullName: true, avatarUrl: true } },
          },
        },
      },
    });

    res.status(201).json({ success: true, data: message });
  } catch (error) {
    next(error);
  }
}
