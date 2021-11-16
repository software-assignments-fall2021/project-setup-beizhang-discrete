const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TableSchema = new Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    tableName: String,
    numPlayers: { type: Number, min: 2, max: 7},
    curPlayers: { type: Number, min: 1, max: 7},
    curPlayers: Number,
    startingValue: Number,
    smallBlind: Number,
    bigBlind: Number,
    status: String

});

module.exports = { Table : mongoose.model('Table', TableSchema) }
// module.exports = mongoose.model("Table", TableSchema)