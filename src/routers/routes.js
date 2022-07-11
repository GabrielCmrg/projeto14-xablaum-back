import express from 'express';

import { productMiddlewares, authMiddlewares } from '../middlewares/index.js';
import {
  productController,
  authController,
  cartController,
  checkoutController,
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
router.post('/product/:productId', productController.increaseViews);

// cart routes
router.post(
  '/cart',
  authMiddlewares.validateToken,
  productMiddlewares.validateProduct,
  authMiddlewares.checkToken,
  productMiddlewares.checkProduct,
  cartController.addToCart
);
router.get(
  '/cart',
  authMiddlewares.validateToken,
  authMiddlewares.checkToken,
  cartController.getCart
);

// checkout routes
router.delete(
  '/checkout',
  authMiddlewares.validateToken,
  authMiddlewares.checkToken,
  checkoutController.deleteCart
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
