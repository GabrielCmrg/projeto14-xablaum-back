import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { auth } from '../models/index.js';

dotenv.config();
const EXPIRE_TIME = 24 * 60 * 60;

const createUserSession = async (userId, secretKey) => {
  const session = {
    userId,
  };
  const sessionId = await auth.createSession(session);

  const data = { sessionId };
  const expire = { expiresIn: EXPIRE_TIME };
  const token = jwt.sign(data, secretKey, expire);
  await auth.addTokenInSession(userId, token);

  return token;
};

export const signup = async (req, res) => {
  const { name, email, password } = res.locals.newUser;

  const passwordCrypt = bcrypt.hashSync(password, 10);

  try {
    const emailAlreadyExist = await auth.getUserByEmail(email);
    if (emailAlreadyExist) return res.status(409).send('E-mail já existe!');

    const user = { name, email, password: passwordCrypt };
    await auth.createUser(user);

    return res.status(201).send('OK');
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

export const login = async (req, res) => {
  const { _id: userId } = res.locals.user;
  const secretKey = process.env.JWT_SECRET;

  try {
    const existingUserSession = await auth.getSessionByUserId(userId);

    if (existingUserSession) {
      try {
        jwt.verify(existingUserSession.token, secretKey);
        return res.status(200).send(existingUserSession.token);
      } catch (error) {
        const { _id: sessionId } = existingUserSession;
        await auth.deleteSession(sessionId);
        const token = await createUserSession(userId, secretKey);
        return res.status(200).send(token);
      }
    } else {
      const token = await createUserSession(userId, secretKey);
      return res.status(200).send(token);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};
