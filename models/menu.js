const mongoose = require('mongoose');
const menuSchema = mongoose.Schema({
    name: {type:String, unique:true},
    description: String,
    price: Number,
    category: String,
    
});
module.exports = mongoose.model('menus',menuSchema);