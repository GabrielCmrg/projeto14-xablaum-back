import { db } from "./index.js";
import { stripHtml } from "string-strip-html";
import joi from "joi";

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