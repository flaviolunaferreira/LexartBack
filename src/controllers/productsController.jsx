const { Router } = require('express');

const productRouter = new Router();

productRouter.get('/', (req, res) => {
  res.send('GET request to the homepage')
})

productRouter.get('/:web/:category', (req, res) => {
  res.send(req.params.bookId) 
})

productRouter.post('/', function (req, res) {
  res.send('POST request to the homepage')
})

module.exports = productRouter;
