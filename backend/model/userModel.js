const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:String,
    title:String,
    age:Number,
    location:String,
    start:String,
    end:String,
});

const userModel = mongoose.model('userData', userSchema);

module.exports = userModel;