
import { Router } from 'express';
import {
  getCourses,
  getCourseById,
  enrollCourse,
  createCourse,
} from '../controllers/coursesController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

router.use(authenticate);

router.get('/', getCourses);
router.get('/:id', getCourseById);
router.post('/:id/enroll', enrollCourse);
router.post('/', authorize('INSTRUCTOR', 'ADMIN'), createCourse);

export default router;
