const mongoose = require('mongoose');
const accountSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    username:{type:String,unique:true},
    email:String,
    password: String,
    role:String,
    token: String
});
module.exports = mongoose.model('accounts',accountSchema);