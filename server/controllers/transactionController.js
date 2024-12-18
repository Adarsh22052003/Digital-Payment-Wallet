const Transaction = require("../models/Transaction");
const User = require("../models/User");
const { io } = require("../server");


// Create a new transaction
const createTransaction = async (req, res) => {
  const { type, amount, description } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    let newBalance = user.balance;

    if (type === "debit") {
      if (user.balance < amount) {
        return res.status(400).json({ message: "Insufficient balance" });
      }
      newBalance -= amount;
    } else if (type === "credit") {
      newBalance += amount;
    } else {
      return res.status(400).json({ message: "Invalid transaction type" });
    }

    const transaction = await Transaction.create({
      user: req.user.id,
      type,
      amount,
      description,
      balanceAfter: newBalance,
    });

    user.balance = newBalance;
    await user.save();
    io.emit("balanceUpdated", { userId: req.user.id, newBalance });


    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user transactions
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createTransaction, getTransactions };
