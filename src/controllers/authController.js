import bcrypt from 'bcrypt';

import { authMiddlewares } from "../middlewares/index.js";
import { auth } from '../models/index.js';

export const cadastro = async (req, res) => {
    const { name, email, password } = res.locals.newUser

    const passwordCrypt = bcrypt.hashSync(password, 10);

    try {
        const emailAlreadyExist = await auth.getUserByEmail(email);
        if (emailAlreadyExist) return res.status(409).send('E-mail já existe!');

        const user = { name, email, password: passwordCrypt }
        await auth.createUser(user)

        res.status(201).send('OK')
    } catch (error) {
        res.status(500).send(error)
    }
}