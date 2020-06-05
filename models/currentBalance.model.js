const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const crntBalanceSchema = new Schema({
    userId: {type: String, required: true, unique: true},
    currentBalance: {type: Number, required: true}
}, {
    timestamps: true
});

module.exports = mongoose.model('CurrentBalance', crntBalanceSchema);