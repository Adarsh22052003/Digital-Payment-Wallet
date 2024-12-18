const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["credit", "debit"], required: true },
    amount: { type: Number, required: true },
    description: { type: String },
    balanceAfter: { type: Number }, // Balance after this transaction
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", TransactionSchema);
