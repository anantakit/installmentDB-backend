const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FinancialSchema = new Schema({
  totalDebt: Number,
  totalPaidAmount: Number,
  totalRemainingAmount: Number
});

module.exports = mongoose.model("financialInfo", FinancialSchema,"financialInfo");
