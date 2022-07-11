import { product } from '../models/index.js';

export const validateProduct = (req, res, next) => {
  const validation = product.productSchema.validate(req.body);
  if (validation.error) {
    return res.status(422).send('O produto não possui os devidos campos.');
  }
  res.locals.product = validation.value;
  next();
  return true;
};

export const checkProduct = async (req, res, next) => {
  try {
    const { product: productReceived } = res.locals;
    const productFromDb = await product.getProduct(productReceived);
    if (!productFromDb) {
      return res.status(404).send('Produto não encontrado.');
    }
    res.locals.product = productFromDb;
    next();
    return true;
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send('Algo deu errado ao buscar o produto na base de dados');
  }
};
