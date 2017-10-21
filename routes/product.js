const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');

// security
const middleware = require('../config/passport');
// product 
const Product = require('../models/product');
// fotoğraf yüklemeleri için gerekli ayarlar
const multerConf = {
  storage: multer.diskStorage({
    destination: function (req, file, next) {
      next(null, './public/images/shop');
    },
    filename: function (req, file, next) {
      const ext = file.mimetype.split('/')[1];
      next(null, 'photo-' + Date.now() + '.' + ext);
    }
  }),
  fileFilter: function (req, file, next) {
    if (!file) {
      next();
    }
    const image = file.mimetype.startsWith('image/');
    if (image) {
      next(null, true);
    }
    else {
      next({ message: "File type not supported" }, false);
    }
  }
}

/* GET product page. */
router.get('/', middleware.isLoggedIn, function (req, res, next) {
  Product.find(function (err, data) {
    res.render('shop/product', { title: 'Products', products: data });
  });
});

router.get('/:id', middleware.isLoggedIn, (req, res) => {
  var id = req.params.id;
  // FIND
  Product.findById(id, (err, result) => {
    if (err) throw err;
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(result));
  })
});

/* POST product page. */
router.post('/add', multer(multerConf).single('imagePath'), function (req, res, next) {
  // DATA BILGISI
  var m = req.body;
  // OBJECT
  var data = new Product({
    imagePath: req.file.filename,
    title: m.title,
    description: m.description,
    price: m.price
  });

  data.save((err, result) => {
    if (err) throw err;
    res.status(201).send(JSON.stringify(result));
  });
});

router.post('/update/:id', multer(multerConf).single('imagePath'), function (req, res, next) {
  // ID
  var id = req.params.id;
  // DATA
  var m = req.body;
  // OBJECT
  var data = {
    title: m.title,
    description: m.description,
    price: m.price
  };

  if (req.file.filename != '')
    data.imagePath = req.file.filename;

  Product.findByIdAndUpdate({ _id: id }, data, (err, result) => {
    if (err) throw err;
    data._id = id;
    data.isUpdate = true;
    // OLD IMAGE REMOVE
    if (data.imagePath === '') {
      data.imagePath = result.imagePath;
    } else {
      fs.unlink('./public/images/shop/' + result.imagePath);
    }
    // RETURN
    res.status(201).send(JSON.stringify(data));
  });
});

module.exports = router;
