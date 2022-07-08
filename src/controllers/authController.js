import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { auth } from "../models/index.js";

dotenv.config();
const EXPIRE_TIME = 24 * 60 * 60;

export const cadastro = async (req, res) => {
  const { name, email, password } = res.locals.newUser;

  const passwordCrypt = bcrypt.hashSync(password, 10);

  try {
    const emailAlreadyExist = await auth.getUserByEmail(email);
    if (emailAlreadyExist) return res.status(409).send("E-mail já existe!");

    const user = { name, email, password: passwordCrypt };
    await auth.createUser(user);

    res.status(201).send("OK");
  } catch (error) {
    res.status(500).send(error);
  }
};

export const login = async (req, res) => {
  const { _id } = res.locals.newSession;
  const secretKey = process.env.JWT_SECRET;

  try {
    const userLogged = await auth.getSessionByUserId(_id);

    if (userLogged) {
      try {
        const { sessionId } = jwt.verify(userLogged.token, secretKey);

        const sessionExists = await auth.getSessionById(sessionId)

        if(sessionExists.userId !== _id) {
            throw 'token não condiz com usuário'
        } 

        res.status(200).send(userLogged.token);
      } catch (error) {
        await auth.deleteSession(userLogged._id);
        res.status(401).send("Session finished");
      }
    } else if (!userLogged) {
      const session = {
        userId: _id,
      };
      await auth.createSession(session);

      const userSession = await auth.getSessionByUserId(_id);

      const data = { sessionId: userSession._id };
      const expire = { expiresIn: EXPIRE_TIME };
      const token = jwt.sign(data, secretKey, expire);

      await auth.addTokenInSession(_id, token);

      res.status(200).send(token);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
