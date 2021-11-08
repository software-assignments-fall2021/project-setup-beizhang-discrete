const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TableSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tableName: String,
    numPlayers: { type: Number, min: 2, max: 7, required: true},
    curPlayers: { type: Number, min: 1, max: numPlayers, required: true},
    startingValue: Number,
    smallBlind: Number,
    bigBlind: Number,
    status: String

});

module.exports = { User : mongoose.model('User', UserSchema) }