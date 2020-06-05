const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    userId: {type: String, required:true},
    type: {type: String, required: true},
    currentBalance: {type: Number, required: true},
    inputBalance: {type: Number, required: true},
    description: {type: String, required: true}
}, {
    timestamps: true
});

module.exports = mongoose.model('Transaction', transactionSchema);