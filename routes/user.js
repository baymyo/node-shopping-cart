const express = require('express');
const router = express.Router();

// plugins
const csrf = require('csurf');
const passport = require('passport');
const middleware = require('../config/middleware');
// product 
const Product = require('../models/product');
// token
const csrfProtection = csrf();
router.use(csrfProtection);

/* GET user page. */
router.get('/profile', middleware.isLoggedIn, function (req, res, next) {
    console.log("profile in");
    res.render('user/profile');
});

router.get('/logout', middleware.isLoggedIn, function (req, res, next) {
    req.logout();
    req.flash('success', 'Successfully loggin out!');
    res.redirect('/');
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

/* POST user page. */
router.post('/signin',
    passport.authenticate('local.signin', {
        failureRedirect: '/user/signin',
        failureFlash: true
    }), function (req, res, next) {
        if (req.session.oldUrl) {
            var oldUrl = req.session.oldUrl;
            req.session.oldUrl = null;
            res.redirect(oldUrl);
        } else {
            res.redirect('/user/profile');
        }
    });

router.post('/signup',
    passport.authenticate('local.signup', {
        failureRedirect: '/user/signup',
        failureFlash: true
    }), function (req, res, next) {
        if (req.session.oldUrl) {
            var oldUrl = req.session.oldUrl;
            req.session.oldUrl = null;
            res.redirect(oldUrl);
        } else {
            res.redirect('/user/profile');
        }
    });

module.exports = router;