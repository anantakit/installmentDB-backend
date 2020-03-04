const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionsSchema = new Schema({
  uid: String,
  amount: Number,
  date: Date,
  evidence: String,
  type: String
});

module.exports = mongoose.model(
  "transactions",
  TransactionsSchema,
  "transactions"
);
