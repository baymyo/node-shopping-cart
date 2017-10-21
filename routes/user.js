const express = require('express');
const router = express.Router();

// plugins
const csrf = require('csurf');
const passport = require('passport');
const middleware = require('../config/passport');
// product 
const Product = require('../models/product');
// token
const csrfProtection = csrf();
router.use(csrfProtection);

/* GET user page. */
router.get('/profile', middleware.isLoggedIn, function (req, res, next) {
    res.render('user/profile');
});

router.use('/', middleware.notLoggedIn, function (req, res, next) {
    next();
});

router.get('/signin', function (req, res, next) {
    var messages = req.flash('error');
    res.render('user/signin', { csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 });
});

router.get('/signup', function (req, res, next) {
    var messages = req.flash('error');
    res.render('user/signup', { csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 });
});

router.get('/logout', function (req, res, next) {
    req.logout();
    res.redirect('/');
});

/* POST user page. */
router.post('/signin',
    passport.authenticate('local.signin', {
        successRedirect: '/user/profile',
        failureRedirect: '/user/signup',
        failureFlash: true
    }));

router.post('/signup',
    passport.authenticate('local.signup', {
        successRedirect: '/user/profile',
        failureRedirect: '/user/signup',
        failureFlash: true
    }));

module.exports = router;