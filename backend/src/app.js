const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes"); // 

const walletRoutes = require("./routes/walletRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const userRoutes = require("./routes/userRoutes");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the FinPay backend API");
});

//  CONNECT AUTH ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/user", userRoutes);
module.exports = app;