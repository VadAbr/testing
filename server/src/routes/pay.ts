import { Router } from 'express';
import { startPayment, cancelPayment, checkPayment, getLastPayment } from '../controllers/pay';
import { authenticate } from '../middlewares/auth';

const router = Router();

router.use(authenticate);
router.post('/startPayment', startPayment);
router.post('/cancelPayment', cancelPayment);
router.post('/checkPayment', checkPayment);
router.get('/getLastPayment', getLastPayment);

export default router;
