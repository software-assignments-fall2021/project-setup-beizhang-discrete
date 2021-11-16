const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
    val: String,
    suit: String,
    revealed: Boolean
});

const PlayerSchema = new Schema({
    userID: String,
    chips: Number,
    action: String,
    cardOne: CardSchema,
    cardTwo: CardSchema
});

const TableSchema = new Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    tableName: String,
    numPlayers: { type: Number, min: 2, max: 7},
    curPlayers: { type: Number, min: 1, max: 7},
    curPlayers: Number,
    startingValue: Number,
    smallBlind: Number,
    bigBlind: Number,
    status: String,
    game: {
        pot: Number,
        bet: Number,
        centerCards: {
            flopOne: CardSchema,
            flopTwo: CardSchema,
            flopThree: CardSchema,
            turn: CardSchema,
            river: CardSchema,
        },
        players: [PlayerSchema]
    }
});

module.exports = { Table : mongoose.model('Table', TableSchema) }
// module.exports = mongoose.model("Table", TableSchema)