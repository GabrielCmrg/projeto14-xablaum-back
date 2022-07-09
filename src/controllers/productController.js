import { product } from '../models/index.js';

export const registerProduct = async (req, res) => {
  const validProduct = res.locals.product;
  try {
    const newProduct = { ...validProduct, views: 0, purchases: 0 };
    await product.createProduct(newProduct);
    return res.status(201).send('Produto criado com sucesso.');
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send('Algo deu errado ao cadastrar o produto na base de dados.');
  }
};
