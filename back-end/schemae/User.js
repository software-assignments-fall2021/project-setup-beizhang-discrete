const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    avatar: String,
    status: String,
    friends: [String],
});

module.exports = { User : mongoose.model('User', UserSchema) }