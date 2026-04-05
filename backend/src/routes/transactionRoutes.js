const express = require("express");
const router = express.Router();

const { sendMoney } = require("../controllers/transactionController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/send", authMiddleware, sendMoney);

module.exports = router;