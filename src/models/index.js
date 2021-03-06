import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);
let db;
client.connect().then(() => {
  db = client.db(process.env.DB_NAME);
});

export { db };

export * as product from './product.js';
export * as auth from './auth.js';
export * as cart from './cart.js';
