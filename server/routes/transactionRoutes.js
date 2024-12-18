const express = require("express");
const { createTransaction, getTransactions } = require("../controllers/transactionController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", protect, createTransaction);
router.get("/", protect, getTransactions);


module.exports = router;
