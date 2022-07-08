import { db } from "./index.js";
import joi from "joi";

const users = "users";
const sessions = "sessions";

export const getUserByEmail = async (email) => {
  const user = await db.collection(users).findOne({ email });
  return user;
};

export const createUser = async (user) => {
  await db.collection(users).insertOne(user);
};

export const getSessionById = async (id) => {
  const userLogged = await db.collection("sessions").findOne({
    userId: id,
  });
  return userLogged;
};

export const createSession = async (session) => {
  await db.collection(sessions).insertOne(session);
};

export const addTokenInSession = async (userId, token) => {
  await db.collection(sessions).updateOne(
    {
      userId: userId,
    },
    {
      $set: { token: token },
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
  email: joi.string().email().required(),
  password: joi.string().required(),
  confirmPassword: joi.string().equal(joi.ref("password")),
});

export const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});
