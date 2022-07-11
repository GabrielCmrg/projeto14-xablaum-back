import express from 'express';

import {
  productMiddlewares,
  authMiddlewares,
  cartMiddlewares,
} from '../middlewares/index.js';
import {
  productController,
  authController,
  cartController,
} from '../controllers/index.js';

const router = express.Router();

// product routes
router.post(
  '/create-new-product',
  productMiddlewares.validateProduct,
  productController.registerProduct
);
router.get('/promo-products', productController.getPromoProducts);
router.get('/viewed-products', productController.getMostViewedProducts);
router.get('/purchased-products', productController.getMostPurchasedProducts);
router.get('/product/:productId', productController.getProductInfo);

// cart routes
router.post(
  '/cart',
  cartMiddlewares.validateRequest,
  authMiddlewares.checkToken,
  productMiddlewares.checkProduct,
  cartController.addToCart
);

// authentication routes
router.post('/sign-up', authMiddlewares.validateSignUp, authController.signup);
router.post(
  '/login',
  authMiddlewares.validateLogin,
  authMiddlewares.checkUserLogin,
  authController.login
);

export default router;
