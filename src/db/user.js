const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  nickName: String,
  email: String,
  phone: String,
  totalLoan: Number,
  paidAmount: Number,
  remainingAmount: Number
});

module.exports = mongoose.model("user", UserSchema);
