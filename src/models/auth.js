import joi from 'joi';

import { db } from './index.js';

const users = 'users';
const sessions = 'sessions';

export const getUserByEmail = async (email) => {
  const user = await db.collection(users).findOne({ email });
  return user;
};

export const createUser = async (user) => {
  await db.collection(users).insertOne(user);
};

export const getSessionByUserId = async (id) => {
  const userLogged = await db.collection(sessions).findOne({
    userId: id,
  });
  return userLogged;
};

export const getSessionById = async (id) => {
  const userLogged = await db.collection(sessions).findOne({
    _id: id,
  });
  return userLogged;
};

export const createSession = async (session) => {
  const { insertedId } = await db.collection(sessions).insertOne(session);
  return insertedId;
};

export const addTokenInSession = async (userId, token) => {
  await db.collection(sessions).updateOne(
    {
      userId,
    },
    {
      $set: { token },
    }
  );
};

export const deleteSession = async (sessionId) => {
  await db.collection(sessions).deleteOne({
    _id: sessionId,
  });
};

export const signUpSchema = joi.object({
  name: joi.string().required().trim(),
  email: joi.string().email().trim().required(),
  password: joi.string().trim().required(),
  confirmPassword: joi.string().trim().equal(joi.ref('password')).required(),
});

export const loginSchema = joi.object({
  email: joi.string().email().trim().required(),
  password: joi.string().trim().required(),
});

export const headerSchema = joi
  .object({
    authorization: joi
      .string()
      .pattern(/^Bearer .+$/)
      .required(),
  })
  .unknown(true);
