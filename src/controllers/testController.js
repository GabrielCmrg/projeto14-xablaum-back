import { test } from '../models/index';

export const ok = async (req, res) => {
  try {
    const message = await test.getMessage();
    res.send(message);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};