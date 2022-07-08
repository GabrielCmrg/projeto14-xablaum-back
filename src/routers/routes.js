import express from "express";

import { authMiddlewares } from "../middlewares/index.js";
import { authController } from "../controllers/index.js";

import { testMiddlewares } from "../middlewares/index.js";
import { testController } from "../controllers/index.js";

const router = express.Router();

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

router.get("/", testMiddlewares.validation, testController.ok);

export default router;
