const mongoose = require('mongoose');

const transactionHistorySchema = new mongoose.Schema({
    userId: { type: String },
    type: { type: String, enum: ['credit', 'debit'] },
    amount: Number,
    timestamp: { type: Date, default: Date.now }
});

const TransactionHistory = mongoose.model('TransactionHistory', transactionHistorySchema);

module.exports = TransactionHistory;
