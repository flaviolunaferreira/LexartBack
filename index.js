const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`API is runing in the port -> ${port}!`));
