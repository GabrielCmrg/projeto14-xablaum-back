import joi from 'joi';
import { ObjectId } from 'mongodb';

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

export const getProducts = async function () {
  const allProducts = await db.collection(products).find({}).toArray();

  return allProducts;
};

export const getProductById = async function (id) {
  const productId = new ObjectId(id);
  const productInfo = await db.collection(products).findOne({ _id: productId });
  return productInfo;
};

export const getProduct = async function (product) {
  const productFromDb = await db.collection(products).findOne(product);
  return productFromDb;
};
