import { cart } from "../models/index.js";

export const deleteCart = async (req, res) => {
    const {userId} = res.locals
    try {
        const userCart = await cart.deleteCartByuserId(userId)
        if (!userCart) {
          return res.status(422).send('não foi possível cancelar este carrinho')
        } 
        res.status(201).send('OK')
    } catch (error) {
        res.status(500).send(error)
    }
}