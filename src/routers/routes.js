import express from 'express';

import { productMiddlewares, testMiddlewares } from '../middlewares/index';
import { productController, testController } from '../controllers/index';

const router = express.Router();

router.get('/', testMiddlewares.validation, testController.ok);

router.post(
  '/create-new-product',
  productMiddlewares.validateProduct,
  productController.registerProduct
);

export default router;
