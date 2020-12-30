const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nexonIdSchema = new Schema({
    nexonEmail:{
        type: String,
        unique: true
    },
    games: {
        type: Object
    }
});

module.exports = mongoose.model('nexonusers', nexonIdSchema);

