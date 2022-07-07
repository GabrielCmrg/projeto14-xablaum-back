import { authMiddlewares } from "../middlewares/index.js"

export const login = async (req, res) => {
    const { name, email, password } = res.locals.newUser
    res.send(name)
}