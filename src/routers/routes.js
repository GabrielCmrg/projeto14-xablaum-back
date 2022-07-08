import express from "express";

import { productMiddlewares, authMiddlewares } from '../middlewares/index.js';
import { productController, authController } from '../controllers/index.js';

const router = express.Router();

// product routes
router.post(
  '/create-new-product',
  productMiddlewares.validateProduct,
  productController.registerProduct
);

// authentication routes
router.post(
  "/sign-up",
  authMiddlewares.validateSignUp,
  authController.cadastro
);

router.post(
  "/login",
  authMiddlewares.validateLogin,
  authMiddlewares.checkUserLogin,
  authController.login
);

export default router;
