var { mongoose } = require('../config/database');

var schema = mongoose.Schema;

var orderSchema = new schema({
    user: { type: schema.Types.ObjectId, ref: 'User' },
    cart: { type: Object, required: true },
    address: { type: String, required: true },
    name: { type: String, required: true },
    paymentId: { type: String, required: true }
});

module.exports = mongoose.model('Order', orderSchema);