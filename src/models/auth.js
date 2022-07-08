import { db } from "./index.js";
import joi from "joi";

const users = 'users';

export const getUserByEmail = async (email) => {
    const user = await db.collection(users).findOne({ email });
    return user;
}

export const createUser = async (user) => {
    await db.collection(users).insertOne(user);
}
 
export const signUpSchema = joi.object({
    name: joi.string().required().trim(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().equal(joi.ref('password'))
}) 

export const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
})