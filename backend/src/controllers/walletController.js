const pool = require("../config/db");

// =====================
// GET WALLET
// =====================
exports.getWallet = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      "SELECT * FROM wallets WHERE user_id = $1",
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    res.json({ wallet: result.rows[0] });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// =====================
// SEND MONEY
// =====================
exports.sendMoney = async (req, res) => {
  const client = await pool.connect();

  try {
    const senderId = req.user.id;
    const { email, amount } = req.body;

    const transferAmount = Number(amount);

    if (!email || !transferAmount || transferAmount <= 0) {
      return res.status(400).json({ message: "Invalid input" });
    }

    await client.query("BEGIN");

    const sender = await client.query(
      "SELECT * FROM wallets WHERE user_id = $1 FOR UPDATE",
      [senderId]
    );

    if (sender.rows.length === 0) {
      throw new Error("Sender wallet not found");
    }

    const senderBalance = Number(sender.rows[0].balance);

    if (senderBalance < transferAmount) {
      throw new Error("Insufficient funds");
    }

    const receiverUser = await client.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (receiverUser.rows.length === 0) {
      throw new Error("Receiver not found");
    }

    const receiverId = receiverUser.rows[0].id;

    const receiver = await client.query(
      "SELECT * FROM wallets WHERE user_id = $1 FOR UPDATE",
      [receiverId]
    );

    if (receiver.rows.length === 0) {
      throw new Error("Receiver wallet not found");
    }

    await client.query(
      "UPDATE wallets SET balance = balance - $1 WHERE user_id = $2",
      [transferAmount, senderId]
    );

    await client.query(
      "UPDATE wallets SET balance = balance + $1 WHERE user_id = $2",
      [transferAmount, receiverId]
    );

    await client.query(
      `INSERT INTO transactions (sender_id, receiver_id, amount)
       VALUES ($1, $2, $3)`,
      [senderId, receiverId, transferAmount]
    );

    await client.query("COMMIT");

    res.json({ message: "Transfer successful 💰" });

  } catch (err) {
    await client.query("ROLLBACK");

    console.error(err.message);
    res.status(400).json({ message: err.message });

  } finally {
    client.release();
  }
};

// =====================
// TRANSACTION HISTORY
// =====================
exports.getTransactions = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `
      SELECT 
        t.id,
        t.amount,
        t.created_at,
        u1.email AS sender_email,
        u2.email AS receiver_email
      FROM transactions t
      JOIN users u1 ON t.sender_id = u1.id
      JOIN users u2 ON t.receiver_id = u2.id
      WHERE t.sender_id = $1 OR t.receiver_id = $1
      ORDER BY t.created_at DESC
      `,
      [userId]
    );

    res.json({ transactions: result.rows });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};