const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  transactionId: { type: String, required: true, unique: true },
  items: Array,
  amount: Number,
  customer: {
    name: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    postcode: String,
  },
  paidStatus: { type: Boolean, default: false },
  orderDate: { type: Date, default: Date.now },
});


module.exports = mongoose.model("Payment", paymentSchema, "payments");