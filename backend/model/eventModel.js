const mongoose = require('mongoose');
const userEvent = new mongoose.Schema({
    fileurl: String,
    filename: String,
});

const eventModel = mongoose.model('userEvent', userEvent);

module.exports = eventModel;