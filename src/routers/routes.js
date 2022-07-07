import express from 'express';

import { testMiddlewares } from '../middlewares/index.js';
import { testController } from '../controllers/index.js';

const router = express.Router();

router.post('/sign-up')
router.post('/login')

router.get('/', testMiddlewares.validation, testController.ok);

export default router;
