const express = require("express");
const router = express.Router();

const { getWallet, sendMoney, getTransactions } = require("../controllers/walletController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getWallet);
router.post("/send", authMiddleware, sendMoney);
router.get("/transactions", authMiddleware, getTransactions);

module.exports = router;