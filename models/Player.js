const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let PlayerSchema = new Schema({ 
    name: {
        type: String,
        required: true
    },
    score: {
        type: Number,
    },
});
const Player = mongoose.model('Player', PlayerSchema);
module.exports = Player;