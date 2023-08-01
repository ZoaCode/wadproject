const mongoose = require('mongoose');
const orderitemSchema = mongoose.Schema({
    accountNumber : String,
    orderID : String,
    itemID: String,
    quantity: Number,
    price: Number,
    order: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "order"
    }
});
module.exports = mongoose.model('orderitem',orderitemSchema);