const express = require('express');
const cors = require('cors');
const productRouter = require('./src/controllers/ProductsController');
const port = 3000;

const app = express();
app.use(express.json());
app.use(cors());

app.use('/products', productRouter);


app.listen(port, () => console.log(`API is runing in the port -> ${port}!`));
