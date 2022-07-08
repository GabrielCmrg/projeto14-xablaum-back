import { product } from '../models';

export const validateProduct = (req, res, next) => {
  const validation = product.productSchema.validate(req.body);
  if (validation.error) {
    return res.status(422).send('O produto não possui os devidos campos.');
  }
  res.locals.product = validation.value;
  next();
  return true;
};
