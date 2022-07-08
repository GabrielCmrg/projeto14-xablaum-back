import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);
let db;
client.connect().then(() => {
  db = client.db(process.env.DB_NAME);
});

export * as test from './test.js';
export * as auth from './auth.js';

export { db };
