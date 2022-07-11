import { db } from './index.sj';

const carts = 'carts';

export const getCartByUserId = async function (userId) {
  const cart = await db.collection(carts).findOne({ userId });
  return cart;
};

export const createCart = async function (cartDocument) {
  await db.collection(carts).insertOne(cartDocument);
};

export const updateCart = async function (cart, product) {
  await db.collection(carts).updateOne(cart, { $push: { products: product } });
};
