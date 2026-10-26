import { Router } from 'express';
import {
  getAssignments,
  getAssignmentById,
  updateAssignmentStatus,
  submitAssignment,
  createAssignment,
} from '../controllers/assignmentsController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

router.use(authenticate);

router.get('/', getAssignments);
router.get('/:id', getAssignmentById);
router.patch('/:id/status', updateAssignmentStatus);
router.post('/:id/submit', submitAssignment);
router.post('/', authorize('INSTRUCTOR', 'ADMIN'), createAssignment);

export default router;
