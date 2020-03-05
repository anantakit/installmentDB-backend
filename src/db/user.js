const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  nickName: String,
  email: {
    type: String,
    unique: true
  },
  phone: String,
  totalLoan: {
    type: Number,
    default: 0
  },
  paidAmount: {
    type: Number,
    default: 0
  },
  remainingAmount: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("user", UserSchema);
