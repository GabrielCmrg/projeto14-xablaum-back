import cart from '../models/index.js';

export const addToCart = async (req, res) => {
  const { product, userId } = res.locals;
  try {
    const cartFromDb = await cart.getCartByUserId(userId);
    delete product.views;
    delete product.purchases;
    delete product.description;
    if (!cartFromDb) {
      const cartDocument = {
        userId,
        products: [product],
      };
      await cart.createCart(cartDocument);
    } else {
      await cart.updateCart(cartFromDb, product);
    }
    return res.sendStatus(201);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Algo deu errado ao acessar o carrinho.');
  }
};

export const getCart = async (req, res) => {
  const { userId } = res.locals;
  try {
    const cartFromDb = await cart.getCartByUserId(userId);
    if (!cartFromDb) {
      return res.status(404).send('Carrinho desse usuário não foi encontrado.');
    }
    return res.json(cartFromDb);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Algo deu errado ao acessar o carrinho.');
  }
};
