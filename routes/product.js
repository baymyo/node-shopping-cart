const express = require('express');
const router = express.Router();

// plugins
const middleware = require('../config/passport');
// product 
const Product = require('../models/product');

/* GET home page. */
router.get('/', middleware.isLoggedIn, function (req, res, next) {
  Product.find(function (err, docs) {
    var productChuncks = [];
    var chunkSize = 3;
    for (var i = 0; i < docs.length; i += chunkSize) {
      productChuncks.push(docs.slice(i, i + chunkSize));
    }
    res.render('shop/product', { products: productChuncks });
  });
});

module.exports = router;