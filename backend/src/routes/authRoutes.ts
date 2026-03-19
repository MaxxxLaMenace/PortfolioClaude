import { Router } from 'express';
import { login, register, getMe, seed } from '../controllers/authController';
import { protect } from '../middleware/auth';

const router = Router();

router.post('/login', login);
router.post('/register', protect as any, register);
router.get('/me', protect as any, getMe);
router.post('/seed', seed);

export default router;
