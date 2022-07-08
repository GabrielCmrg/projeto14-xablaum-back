import bcrypt from "bcrypt";
import { stripHtml } from "string-strip-html";

import { auth } from "../models/index.js";

export const validateSignUp = (req, res, next) => {
  const validationBefore = auth.signUpSchema.validate(req.body);
  if (validationBefore.error) return res.sendStatus(422);

  const newUser = {
    name: stripHtml(req.body.name).result,
    email: stripHtml(req.body.email).result,
    password: req.body.password,
  };

  const validationAfter = auth.signUpSchema.validate(newUser);
  if (validationAfter.error) return res.sendStatus(422);

  res.locals.newUser = newUser;

  next();
};

export const validateLogin = (req, res, next) => {
  const validationBefore = auth.loginSchema.validate(req.body);
  if (validationBefore.error)
    return res.status(422).send("Some error with JSON body");

  const newSession = {
    email: stripHtml(req.body.email).result,
    password: req.body.password,
  };

  const validationAfter = auth.loginSchema.validate(newSession);
  if (validationBefore.error)
    return res.status(422).send("Some error with JSON body envolving HTML tag");

  res.locals.newSession = newSession;

  next();
};

export const checkUserLogin = async (req, res, next) => {
  const { email, password } = res.locals.newSession;

  try {
    const user = await auth.getUserByEmail(email);

    const emailOrPasswordWrong =
      !user || !bcrypt.compareSync(password, user.password);
    if (emailOrPasswordWrong)
      return res.status(401).send("Email ou senha errados!");

    res.locals.newSession = user;

    next();
  } catch (error) {
    res.status(500).send(error);
  }
};
