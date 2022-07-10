import joi from 'joi';

import { db } from './index.js';

const products = 'products';

export const productSchema = joi.object({
  name: joi.string().trim().required(),
  oldPrice: joi.number().required(),
  newPrice: joi.number().required(),
  image: joi.string().uri().trim().required(),
  description: joi.string().trim().required(),
});

export const createProduct = async function (product) {
  await db.collection(products).insertOne(product);
};

export const getProductsWithDiscount = async function () {
  const allProducts = await db.collection(products).find({}).toArray();
  const promos = allProducts.filter(
    (product) => product.newPrice < product.oldPrice
  );

  return promos;
};
