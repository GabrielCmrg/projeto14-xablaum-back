import { stripHtml } from "string-strip-html";
import { auth } from '../models/index.js'

export const validateSignUp = (req, res, next) => {
    const validationBefore = auth.signUpSchema.validate(req.body);
    if (validationBefore.error) return res.sendStatus(422);

    const newUser = {
        name: stripHtml(req.body.name).result,
        email: stripHtml(req.body.email).result,
        password: req.body.password
    }

    const validationAfter = auth.signUpSchema.validate(newUser)
    if(validationAfter.error) return res.sendStatus(422)

    res.locals.newUser = newUser;
    
    next();
}