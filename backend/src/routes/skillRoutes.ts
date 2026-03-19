import { Router } from 'express';
import {
  getAllSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from '../controllers/skillController';
import { protect, adminOnly } from '../middleware/auth';

const router = Router();

router.get('/', getAllSkills);
router.post('/', protect as any, adminOnly, createSkill);
router.put('/:id', protect as any, adminOnly, updateSkill);
router.delete('/:id', protect as any, adminOnly, deleteSkill);

export default router;
