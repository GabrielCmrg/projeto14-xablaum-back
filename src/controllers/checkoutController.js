import { cart } from '../models/index.js';

export const deleteCart = async (req, res) => {
  const { cartId } = res.params;
  try {
    const userCart = await cart.deleteCartById(cartId);
    if (!userCart) {
      return res.status(422).send('não foi possível cancelar este carrinho');
    }
    return res.status(201).send('OK');
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};
