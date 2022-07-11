import { auth, product } from '../models/index.js';

export const validateRequest = (req, res, next) => {
  const headerValidation = auth.headerSchema.validate(req.headers);
  const validation = product.productSchema.validate(req.body);
  if (headerValidation.error || validation.error) {
    return res.sendStatus(422);
  }
  res.locals.token = headerValidation.value.authorization.replace(
    'Bearer ',
    ''
  );
  res.locals.product = validation.value;
  next();
  return true;
};
