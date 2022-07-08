import joi from 'joi';

import { db } from './index';

const products = 'products';

export const productSchema = joi.object({
  name: joi.string().required(),
  oldPrice: joi.number().required(),
  newPrice: joi.number().required(),
  image: joi.string().uri().required(),
  description: joi.string().required(),
});

export const createProduct = async function (product) {
  await db.collection(products).insertOne(product);
};
