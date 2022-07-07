import { db } from './index.js';

const messages = 'messages';

export const getMessage = async function () {
  const message = await db.collection(messages).findOne({});

  return message;
};
