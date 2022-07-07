import { db } from './index';

const messages = 'messages';

export const getMessage = async function () {
  const message = await db.collection(messages).findOne({});

  return message;
};
