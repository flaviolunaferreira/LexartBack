const ObjectId = require('mongodb');
const connection = require('./Connection');
const request = require('request');
const cheerio = require('cheerio');


const saveProduct = async (product) => {
  const { title, photo, price, site, web, category } = product;
  return await connection().then((db) => db.collection('product')
    .insertOne({ title, photo, price, site, web, category }));
  
}


const getProductBySelected = async (category) => {
  console.log(category);
  const web = "https://www.buscape.com.br/";
  const db = await connection();

  let result = await db.collection('product')
    .find({ "category": category, "web": web }).toArray();
  
  if (result.length > 0) return result;

  minerProduct(web, category)

}

const minerProduct = async(web, category) => {

  const url = web + category;
  console.log(url)

  request(url, function (err, res, body) {
    if (!err && res.statusCode === 200) {

      let $ = cheerio.load(body);
      
      $('.card').each((index, element) => {

        const title = $(element).find('.name').text();
        const photo = $(element).find('a.cardImage > img.image').attr('src');
        const price = $(element).find('span.mainValue').text();
        const site = url + "/" + $(element).find('a.link').attr('href');

        let product = { title, photo, price, site, web, category };
        saveProduct(product);

      })

    }
    
  })

}

module.exports = {
  getProductBySelected
}
