import bcrypt from 'bcrypt';
import { stripHtml } from 'string-strip-html';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { auth } from '../models/index.js';

dotenv.config();

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

export const checkToken = async (req, res, next) => {
  const { token } = res.locals;
  try {
    const { sessionId } = jwt.verify(token, process.env.JWT_SECRET);
    try {
      const session = await auth.getSessionById(sessionId);
      if (!session) {
        return res.status(401).send('Sess??o n??o encontrada.');
      }
      const { userId } = session;
      res.locals.userId = userId;
      next();
      return true;
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send('Algo deu errado ao buscar a sess??o na base de dados.');
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send('O token enviado n??o ?? v??lido.');
  }
};

export const validateToken = (req, res, next) => {
  const headerValidation = auth.headerSchema.validate(req.headers);
  if (headerValidation.error) {
    return res.sendStatus(422);
  }
  res.locals.token = headerValidation.value.authorization.replace(
    'Bearer ',
    ''
  );
  next();
  return true;
};
