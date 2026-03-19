import { Router } from 'express';
import {
  getAllProjects,
  getFeaturedProjects,
  getOneProject,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController';
import { protect, adminOnly } from '../middleware/auth';

const router = Router();

router.get('/', getAllProjects);
router.get('/featured', getFeaturedProjects);
router.get('/:id', getOneProject);
router.post('/', protect as any, adminOnly, createProject);
router.put('/:id', protect as any, adminOnly, updateProject);
router.delete('/:id', protect as any, adminOnly, deleteProject);

export default router;
