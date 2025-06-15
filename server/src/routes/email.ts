import { Router } from 'express';
import { sendEmail } from '../controllers/email';
import { authenticate } from '../middlewares/auth';

const router = Router();

router.use(authenticate);
router.post('/send', sendEmail);

export default router;
