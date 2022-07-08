import express from 'express';

import { productMiddlewares, testMiddlewares } from '../middlewares/index';
import { testController } from '../controllers/index';

const router = express.Router();

router.get('/', testMiddlewares.validation, testController.ok);

router.post('/create-new-product', productMiddlewares.validateProduct);

export default router;
