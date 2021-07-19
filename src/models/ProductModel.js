const ObjectId = require('mongodb');
const connection = require('./Connection');
const request = require('request');
const cheerio = require('cheerio');


const saveProduct = async (product) => {
  const { title, photo, price, site, web, category } = product;
  return await connection().then((db) => db.collection('product')
    .insertOne({ title, photo, price, site, web, category }));  
}


// Buscape
const getProductByBuscape = async (category) => {
  const db = await connection();
  const web = "https://www.buscape.com.br/";
  const result= await db.collection('product')
    .find({ "category": category, "web": web }).toArray();
  if (result.length > 0) return result;

  minerBuscape(web, category)
}

// Mercado Livre
const getProductByMercadoLivre = async (category) => {
  const db = await connection();
  const web = "https://lista.mercadolivre.com.br/"

  const result = await db.collection('product')
    .find({ "category": category, "web": web }).toArray();
  if (result.length > 0) return result;
  minerMercado(web, category)
}

const minerBuscape = async(web, category) => {
  const url = web + category;
  
  request(url, function (err, res, body) {
    if (!err && res.statusCode === 200) {
      let $ = cheerio.load(body);
      $('.card').each((index, element) => {
        const title = $(element).find('.name').text();
        const photo = $(element).find('a.cardImage > img.image').attr('src');
        const price = $(element).find('span.mainValue').text();
        const site = url + $(element).find('a.link').attr('href');
        let product = { title, photo, price, site, web, category };
        saveProduct(product);
      })
    }
  })
  const db = await connection();
  return await db.collection('product')
    .find({ "category": category, "web": web }).toArray();
}

const minerMercado = async (web, category) => {
  const url = web + category;

  request(url, function (err, res, body) {
    if (!err && res.statusCode === 200) {
      let $ = cheerio.load(body);
      $('.andes-card').each((index, element) => {
        const title = $(element).find('h2.ui-search-item__title').text();
        const photo = $(element).find('img.ui-search-result-image__element').attr('src');
        const price = $(element).find('span.price-tag-amount').text();
        const site = $(element).find('a.ui-search-link').attr('href');
        let product = { title, photo, price, site, web, category };
        saveProduct(product);
      })
    }
  })
  const db = await connection();
  return await db.collection('product')
    .find({ "category": category, "web": web }).toArray();
}

module.exports = {
  getProductByBuscape,
  getProductByMercadoLivre
}
