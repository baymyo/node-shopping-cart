const mongoose = require('mongoose');

// veritabanı ayarlarımız için gerekli işlemler.
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });

// oluşturduğumuz modülün çalışabilmesi için olmaza olmaz işlem.
module.exports = {
  mongoose
}
