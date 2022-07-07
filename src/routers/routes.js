import express from 'express';

import { testMiddlewares } from '../middlewares/index';
import { testController } from '../controllers/index';

const router = express.Router();

router.get('/', testMiddlewares.validation, testController.ok);

export default router;
