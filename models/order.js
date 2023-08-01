const mongoose = require('mongoose');
const orderSchema = mongoose.Schema({
    account : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "account"
    },
    totalPrice: Number,
    paid: String,
    Delievered: String,
    date: String,
    time: String,
});
module.exports = mongoose.model('orders',orderSchema);