const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let PlayerSchema = new Schema({ 
    name: {
        type: String,
    },
    score: {
        type: Number,
    },
});
const Player = mongoose.model('Player', PlayerSchema);
module.exports = Player;