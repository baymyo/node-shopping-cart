const express = require('express');
const router = express.Router();

// carts
const Cart = require('../models/cart');
// product 
const Product = require('../models/product');
const Order = require('../models/order');
// security
const middleware = require('../config/middleware');

/* GET home page. */
router.get('/', function (req, res, next) {
  Product.find(function (err, docs) {
    var productChuncks = [];
    var chunkSize = 3;
    for (var i = 0; i < docs.length; i += chunkSize) {
      productChuncks.push(docs.slice(i, i + chunkSize));
    }

    var successMsg = req.flash('success')[0];
    res.render('shop/index', { products: productChuncks, successMsg: successMsg, noMsg: !successMsg });
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

router.get('/shopping-cart', function (req, res, next) {
  if (!req.session.cart) {
    return res.render('shop/shopping-cart', { products: null });
  }
  var cart = new Cart(req.session.cart);
  res.render('shop/shopping-cart', { products: cart.generateArray(), totalQty: cart.totalQty, totalPrice: cart.totalPrice });
});

router.get('/checkout', middleware.isLoggedIn, function (req, res, next) {
  if (!req.session.cart) {
    return res.redirect('/shopping-cart')
  }
  var cart = new Cart(req.session.cart);
  var errMsg = req.flash('error')[0];
  res.render('shop/checkout', { totalPrice: cart.totalPrice, errMsg: errMsg, noError: !errMsg });
});

router.post('/checkout', middleware.isLoggedIn, function (req, res, next) {
  if (!req.session.cart) {
    return res.redirect('/shopping-cart')
  }
  var cart = new Cart(req.session.cart);
  var stripe = require("stripe")("sk_test_5CC0abmFtvetXCkcjV6Ae7zK");
  stripe.charges.create({
    amount: cart.totalPrice * 100,
    currency: "usd",
    source: req.body.stripeToken, // obtained with Stripe.js
    description: "Test Charge"
  }, function (err, charge) {
    if (err) {
      req.flash('error', err.message);
      return res.redirect('/checkout');
    }
    var order = new Order({
      user: req.user,
      cart: cart,
      address: req.body.address,
      name: req.body.name,
      paymentId: charge.id
    });
    order.save(function (err, result) {
      req.flash('success', 'Successfully bougth product!');
      req.session.cart = null;
      res.redirect('/');
    });
  });
});

module.exports = router;
