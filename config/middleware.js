// bu fonksiyonlar passport.js referans verdiğim yerde kullanabilmek için buraya ekledim.
// aktif user varmı yok mu diye bilgileri kontrol ediyorlar.
module.exports = {
    isLoggedIn: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        req.session.oldUrl = req.url;
        res.redirect('/user/signin');
    },
    notLoggedIn: function (req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        res.redirect('/');
    }
}