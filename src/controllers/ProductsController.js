const { Router } = require('express');
const { getProductBySelected } = require('../models/ProductModel');

const productRouter = new Router();

productRouter.get('/', (req, res) => {
  res.send('GET request to the homepage')
})

productRouter.get('/:category', async (req, res) => {
  const { category } = req.params;
  const result = await getProductBySelected(category);
  return res.status(200).send(result);
});

module.exports = productRouter;
