const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const financialInfoSchema = new Schema({
  totalDebt: Number,
  totalPaidAmount: Number,
  totalRemainingAmount: Number
}); 

module.exports = mongoose.model('financialInfo', financialInfoSchema);