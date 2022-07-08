import express from 'express';

import { productMiddlewares } from '../middlewares/index.js';
import { productController } from '../controllers/index.js';

const router = express.Router();

router.post(
  '/create-new-product',
  productMiddlewares.validateProduct,
  productController.registerProduct
);

export default router;
