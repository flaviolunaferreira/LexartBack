const { Router } = require('express');
const { getProductByBuscape, getProductByMercadoLivre } = require('../models/ProductModel');

const productRouter = new Router();

productRouter.get('/', (req, res) => {
  res.send('GET request to the homepage')
})

productRouter.get('/b/:category', async (req, res) => {
  const { category } = req.params;
  console.log('entrei buscape')
  const result = await getProductByBuscape(category);
  return res.status(200).send(result);
});

productRouter.get('/m/:category', async (req, res) => {
  const { category } = req.params;
  console.log('entrei mercado')
  const result = await getProductByMercadoLivre(category);
  return res.status(200).send(result);
});

module.exports = productRouter;
