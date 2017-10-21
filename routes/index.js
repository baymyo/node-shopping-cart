const express = require('express');
const router = express.Router();

// product 
const Product = require('../models/product');
const Cart = require('../models/cart');

/* GET home page. */
router.get('/', function (req, res, next) {
  Product.find(function (err, docs) {
    var productChuncks = [];
    var chunkSize = 3;
    for (var i = 0; i < docs.length; i += chunkSize) {
      productChuncks.push(docs.slice(i, i + chunkSize));
    }
    res.render('shop/index', { products: productChuncks });
  });
});

router.get('/add-to-cart/:id', function (req, res, next) {
  const productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findById(productId, (err, result) => {
    if (err) {
      return res.redirect('/');
    }
    cart.add(result, result._id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/');
  })
});

/* GET home page. */
router.get('/shopping-cart', function (req, res, next) {
  if (!req.session.cart) {
    return res.render('shop/shopping-cart', { products: null });
  }
  var cart = new Cart(req.session.cart);
  res.render('shop/shopping-cart', { products: cart.generateArray(), totalQty: cart.totalQty, totalPrice: cart.totalPrice });
});

module.exports = router;
