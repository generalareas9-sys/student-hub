import { Router } from 'express';
import { getEvents, createEvent, deleteEvent } from '../controllers/eventsController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();
router.use(authenticate);

router.get('/', getEvents);
router.post('/', createEvent);
router.delete('/:id', deleteEvent);

export default router;
