const Product = require('../models/product');

// hiç veriyoksa eklemek için çalıştırın.
// node seed/product-seeder.js

// database connect
const mongoose = require('mongoose');
// connectionString
mongoose.connect('localhost:27017/shopping');

const products = [
    new Product({
        imagePath:'http://tr.web.img4.acsta.net/c_215_290/pictures/17/09/18/10/38/5989315.jpg',
        title:'Cingöz Recai',
        description:'Cingöz Recai yıllar sonra yeni bir soygun için ekibiyle sahalara döner. Ama bu soygunu kendi ekibiyle yapmayacaktır.',
        price: 23
    }),
    new Product({
        imagePath:'http://tr.web.img4.acsta.net/c_215_290/pictures/17/10/05/15/22/1388846.jpg',
        title:'Bir Nefes Yeter',
        description:'Yakışıklı delikanlı Yaman, içten içe mutsuz ve kayıp bir adamdır. Ancak günün birinde her şey değişiverir.',
        price: 55
    }),
    new Product({
        imagePath:'http://tr.web.img4.acsta.net/c_215_290/pictures/17/09/22/13/27/1438912.jpg',
        title:'Ölüm Günün Kutlu Olsun',
        description:'Sıradan bir hayat yaşayan üniversite öğrencisi Tree\'nin hayatı, maskeli bir katil tarafından şaşırtıcı bir şekilde değişir.',
        price: 44
    }),
    new Product({
        imagePath:'http://tr.web.img2.acsta.net/c_215_290/pictures/17/10/04/13/02/4458470.jpg',
        title:'Büyülü Kanatlar',
        description:'Ateşböceği Dindin arkadaşlarıyla birlikte güzel bir ormanda yaşamaktadır.',
        price: 35
    }),
    new Product({
        imagePath:'http://tr.web.img3.acsta.net/c_215_290/pictures/17/10/09/10/08/2177143.jpg',
        title:'Kayseri Aslanı: Çin İşi',
        description:'Ersin, Kayseri\'nin ünlü pastırmacısının oğludur. Altılı ganyandan bir miktar para kazanan Ersin eniştesini de ikna ederek bu para ile kumar oynar.',
        price: 21
    }),
    new Product({
        imagePath:'http://tr.web.img4.acsta.net/c_215_290/pictures/17/09/18/10/38/5989315.jpg',
        title:'Cingöz Recai',
        description:'Cingöz Recai yıllar sonra yeni bir soygun için ekibiyle sahalara döner. Ama bu soygunu kendi ekibiyle yapmayacaktır.',
        price: 23
    }),
    new Product({
        imagePath:'http://tr.web.img4.acsta.net/c_215_290/pictures/17/10/05/15/22/1388846.jpg',
        title:'Bir Nefes Yeter',
        description:'Yakışıklı delikanlı Yaman, içten içe mutsuz ve kayıp bir adamdır. Ancak günün birinde her şey değişiverir.',
        price: 55
    }),
    new Product({
        imagePath:'http://tr.web.img4.acsta.net/c_215_290/pictures/17/09/22/13/27/1438912.jpg',
        title:'Ölüm Günün Kutlu Olsun',
        description:'Sıradan bir hayat yaşayan üniversite öğrencisi Tree\'nin hayatı, maskeli bir katil tarafından şaşırtıcı bir şekilde değişir.',
        price: 44
    }),
    new Product({
        imagePath:'http://tr.web.img2.acsta.net/c_215_290/pictures/17/10/04/13/02/4458470.jpg',
        title:'Büyülü Kanatlar',
        description:'Ateşböceği Dindin arkadaşlarıyla birlikte güzel bir ormanda yaşamaktadır.',
        price: 35
    }),
    new Product({
        imagePath:'http://tr.web.img3.acsta.net/c_215_290/pictures/17/10/09/10/08/2177143.jpg',
        title:'Kayseri Aslanı: Çin İşi',
        description:'Ersin, Kayseri\'nin ünlü pastırmacısının oğludur. Altılı ganyandan bir miktar para kazanan Ersin eniştesini de ikna ederek bu para ile kumar oynar.',
        price: 21
    }),
    new Product({
        imagePath:'http://tr.web.img4.acsta.net/c_215_290/pictures/17/09/22/13/27/1438912.jpg',
        title:'Ölüm Günün Kutlu Olsun',
        description:'Sıradan bir hayat yaşayan üniversite öğrencisi Tree\'nin hayatı, maskeli bir katil tarafından şaşırtıcı bir şekilde değişir.',
        price: 44
    })
];

for (var i = 0; i < products.length; i++) {
   products[i].save(function(err,result) {
       if (i===products.length) {
           exit();
       }
   });
}

function exit(){
    mongoose.disconnect();
}