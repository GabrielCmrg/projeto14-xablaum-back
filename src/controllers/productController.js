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

export const getPromoProducts = async (req, res) => {
  try {
    const products = await product.getProducts();
    const promos = products.filter((prod) => prod.newPrice < prod.oldPrice);
    return res.json(promos);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Algo deu errado ao tentar buscar os produtos');
  }
};

export const getMostViewedProducts = async (req, res) => {
  try {
    const products = await product.getProducts();
    const mostViewed = [...products];
    mostViewed.sort((a, b) => {
      if (a.views < b.views) return -1;
      if (b.view < a.views) return 1;
      return 0;
    });
    return res.json(mostViewed);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Algo deu errado ao tentar buscar os produtos');
  }
};
