var mongoose = require('mongoose');
var schema = mongoose.Schema;

var productSchema = new schema({
    imagePath: { type: String, required: true },
    title: { type: String, required: true },
    description: String,
    price: Number
});

module.exports = mongoose.model('Product', productSchema);