const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    transaction_id: String,
    transaction_amt: Number,
    transaction_txs: Object,
    transaction_created: Number,
    payment_types: Object,
    transaction_details: Object,
    user: Object
});

const Transaction = mongoose.model('transactions', transactionSchema);

module.exports = Transaction;