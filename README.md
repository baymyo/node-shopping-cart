# Neler yaptık?
* Ürün Ekleme ve Düzeltme işlemleri.
* Ürüne Fotoğraf Eklemek ve Düzeltme işlemi sırasında eski fotoğrafı silmek yenisini yüklemek.
* Ürünü sepete atmak ve sepetteki ürünleri görüntülemek.
* Üye olmak ve giriş yapmak.
* Güvenlik kontrolleri.
* Sepetimizi cookie ve session üzerinde tutmak.

# Hangi bileşen ne amaçla kullanıldı?
* Tema işlemleri için "bootstrap v4" tercih edildi.
* "jquery-3.2.1" kütüphanesi tercih edildi ve bu sayede postback olmadan bazı işlemleri yaptık.
* Yapı olara "express" ve eklentileri tercih edildi.
* View Engine olarak "handlebars" ve eklentileri tercih edildi. Biz handlebars-helpers için özel fonskiyonlar yazdık bunları görmenizi ve nasıl kullandığımızı incelemenizi isteriz.
* Veritabanı olarak "mongodb" tercih edili ve "mongoose" ile desteklendi.
* Güvenlik işlemleri için "passport" ve "passport-local" yanı sıra csurf ile desteklendi.
* Fotoğraf yükleme işlemleri için "multer" tercih edildi.
* Sepet oluşturma işlemleri sırasında "session", "connect-mongo" ve "cookie" kullanıldı.

---

### Run Locally on Your Machine
You need Node, NPM and MongoDB properly installed.

Clone this repository
``` shell
    git clone https://github.com/baymyo/node-shopping-cart.git
```
Setup the environment variables replacing <MONGODB-PORT> with your mongodb port, usually is 27017.
``` shell
    export MONGO_DB_URI=mongodb://localhost:<MONGODB-PORT>/shopping
```
Install dependencies
``` shell
    npm install
```

With your mongod service running, this will populate shopping database
``` shell
    node seed/product-seeder.js 
```
This will start dev server at http://localhost:3000 with Nodemon.
``` shell
    npm run dev
```

### Tests
``` shell
    npm test
```

### Technologies
###### Back-end
NodeJS, Express, MongoDB, Mongoose. 
###### Fron-end
Handlebars and Bootstrap.
---

###### All Plugins
"Node JS, jquery, express, express-session, express-validator, express-handlebars (helpers), mongoDB (mongoose), connect-mongo, cookie, passport (local), csurf, multer"
