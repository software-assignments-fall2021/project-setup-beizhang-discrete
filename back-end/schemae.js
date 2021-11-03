const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    name: String,
    avatar: {
        data: Buffer,
        contentType: String
    },
    status: String,
});

module.exports = { User };