import { Router } from 'express';
import { login, register, tryAuth } from '../controllers/auth';
import { authenticate } from '../middlewares/auth';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/tryAuth', authenticate, tryAuth);

export default router;
