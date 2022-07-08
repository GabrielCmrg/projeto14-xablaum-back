import express from 'express';

import { productMiddlewares, testMiddlewares } from '../middlewares/index.js';
import { productController, testController } from '../controllers/index.js';

const router = express.Router();

router.get('/', testMiddlewares.validation, testController.ok);

router.post(
  '/create-new-product',
  productMiddlewares.validateProduct,
  productController.registerProduct
);

export default router;
