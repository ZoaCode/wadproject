const mongoose = require('mongoose');
const orderSchema = mongoose.Schema({
    accountId: String,
    totalPrice: Number,
    paid: String,
    Delievered: String,
    date: String,
    time: String,
});
module.exports = mongoose.model('orders',orderSchema);