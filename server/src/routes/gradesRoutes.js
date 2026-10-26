import { Router } from 'express';
import { getGrades } from '../controllers/gradesController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();
router.use(authenticate);
router.get('/', getGrades);

export default router;
