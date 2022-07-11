import { ObjectId } from 'mongodb';
import { db } from './index.js';

const carts = 'carts';

export const getCartById = async function (id) {
  const cart = await db.collection(carts).findOne({ _id: new ObjectId(id) });
  return cart;
};

export const deleteCartById = async function (id) {
  const cart = await db.collection(carts).deleteOne({ _id: new ObjectId(id) });
  return cart;
};

export const getCartByUserId = async function (userId) {
  const cart = await db.collection(carts).findOne({ userId });
  return cart;
};

export const createCart = async function (cartDocument) {
  await db.collection(carts).insertOne(cartDocument);
};

export const updateCart = async function (cart, product) {
  const cartFromDb = db.collection(carts).findOne(cart);
  const idsOnCart = cartFromDb.products.map((p) => {
    const { _id: pId } = p;
    return pId;
  });
  const { _id: productId } = product;
  if (idsOnCart.includes(productId)) {
    const existingProductIndex = idsOnCart.indexOf(productId);
    cartFromDb.products[existingProductIndex].qtd += 1;
    await db
      .collection(carts)
      .updateOne(cart, { $set: { products: cartFromDb.products } });
  } else {
    await db
      .collection(carts)
      .updateOne(cart, { $push: { products: { ...product, qtd: 1 } } });
  }
};
