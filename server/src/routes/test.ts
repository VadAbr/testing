import { Router } from 'express';
import {
  askForHelp,
  completeTest,
  currentTest,
  getAllTests,
  exportTestsToExcel,
  createTest,
} from '../controllers/test';
import { authenticate } from '../middlewares/auth';
import { isAdmin } from '../middlewares/isAdmin';

const router = Router();

router.use(authenticate);

router.post('/completeTest', completeTest);
router.get('/currentTest', currentTest);
router.get('/getAllTests', isAdmin, getAllTests);
router.get('/exportAllTest', isAdmin, exportTestsToExcel);
router.post('/askForHelp', askForHelp);
router.post('/createTest', createTest);

export default router;
