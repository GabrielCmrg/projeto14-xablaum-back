import bcrypt from 'bcrypt';
import { stripHtml } from 'string-strip-html';

import { auth } from '../models/index.js';

export const validateSignUp = (req, res, next) => {
  const validationBefore = auth.signUpSchema.validate(req.body);
  if (validationBefore.error)
    return res.status(422).send('Some error with JSON body');

  const newUser = {
    name: stripHtml(validationBefore.value.name).result,
    email: stripHtml(validationBefore.value.email).result,
    password: validationBefore.value.password,
    confirmPassword: validationBefore.value.confirmPassword,
  };

  const validationAfter = auth.signUpSchema.validate(newUser);
  if (validationAfter.error)
    return res.status(422).send('Some error with JSON body envolving HTML tag');

  res.locals.newUser = newUser;

  next();
  return true;
};

export const validateLogin = (req, res, next) => {
  const validationBefore = auth.loginSchema.validate(req.body);
  if (validationBefore.error)
    return res.status(422).send('Some error with JSON body');

  const credentials = {
    email: stripHtml(validationBefore.value.email).result,
    password: validationBefore.value.password,
  };

  const validationAfter = auth.loginSchema.validate(credentials);
  if (validationAfter.error)
    return res.status(422).send('Some error with JSON body envolving HTML tag');

  res.locals.credentials = validationAfter.value;

  next();
  return true;
};

export const checkUserLogin = async (req, res, next) => {
  const { email, password } = res.locals.credentials;

  try {
    const user = await auth.getUserByEmail(email);

    const emailOrPasswordWrong =
      !user || !bcrypt.compareSync(password, user.password);
    if (emailOrPasswordWrong)
      return res.status(401).send('Email ou senha incorretos!');

    res.locals.user = user;

    next();
    return true;
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};
