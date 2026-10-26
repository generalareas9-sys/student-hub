import { Router } from 'express';
import { getMessages, sendMessage } from '../controllers/chatController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();
router.use(authenticate);

router.get('/messages', getMessages);
router.post('/messages', sendMessage);

export default router;
