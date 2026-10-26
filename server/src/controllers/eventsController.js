import prisma from '../config/db.js';

export async function getEvents(req, res, next) {
  try {
    const userId = req.user.id;

    // Return events belonging to this user OR general academic events (userId === null)
    const events = await prisma.calendarEvent.findMany({
      where: {
        OR: [{ userId }, { userId: null }],
      },
      orderBy: { startTime: 'asc' },
    });

    res.json({ success: true, data: events });
  } catch (error) {
    next(error);
  }
}

export async function createEvent(req, res, next) {
  try {
    const userId = req.user.id;
    const { title, eventType, startTime, endTime, color, location } = req.body;

    const event = await prisma.calendarEvent.create({
      data: {
        userId,
        title,
        eventType: eventType || 'CLASS',
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        color: color || '#5048e5',
        location: location || 'Main Hall',
      },
    });

    res.status(201).json({ success: true, data: event, message: 'Event added to schedule!' });
  } catch (error) {
    next(error);
  }
}

export async function deleteEvent(req, res, next) {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const event = await prisma.calendarEvent.findUnique({ where: { id } });
    if (!event) {
      return res.status(404).json({ success: false, error: 'Event not found.' });
    }

    if (event.userId && event.userId !== userId && req.user.role !== 'ADMIN') {
      return res.status(403).json({ success: false, error: 'Forbidden.' });
    }

    await prisma.calendarEvent.delete({ where: { id } });
    res.json({ success: true, message: 'Event removed from schedule.' });
  } catch (error) {
    next(error);
  }
}
