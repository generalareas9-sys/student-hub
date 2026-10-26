import { Router } from 'express';
import {
  getDashboardStats,
  getStudyHours,
  getPerformanceTrends,
} from '../controllers/dashboardController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.use(authenticate);

router.get('/stats', getDashboardStats);
router.get('/study-hours', getStudyHours);
router.get('/performance', getPerformanceTrends);

export default router;
