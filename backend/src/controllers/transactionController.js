const pool = require("../config/db");

// =====================
// SEND MONEY
// =====================
exports.sendMoney = async (req, res) => {
  const { recipientEmail, amount } = req.body;
  const senderId = req.user.id;

  if (!recipientEmail || !amount || amount <= 0) {
    return res.status(400).json({ message: "Invalid input" });
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // 1. Get sender wallet
    const senderWallet = await client.query(
      "SELECT * FROM wallets WHERE user_id = $1 FOR UPDATE",
      [senderId]
    );

    if (senderWallet.rows.length === 0) {
      throw new Error("Sender wallet not found");
    }

    // 2. Get recipient user
    const recipientUser = await client.query(
      "SELECT * FROM users WHERE email = $1",
      [recipientEmail]
    );

    if (recipientUser.rows.length === 0) {
      throw new Error("Recipient not found");
    }

    const recipientId = recipientUser.rows[0].id;

    // 3. Get recipient wallet
    const recipientWallet = await client.query(
      "SELECT * FROM wallets WHERE user_id = $1 FOR UPDATE",
      [recipientId]
    );

    if (recipientWallet.rows.length === 0) {
      throw new Error("Recipient wallet not found");
    }

    // 4. Check balance
    const senderBalance = parseFloat(senderWallet.rows[0].balance);

    if (senderBalance < amount) {
      throw new Error("Insufficient balance");
    }

    // 5. Deduct sender
    await client.query(
      "UPDATE wallets SET balance = balance - $1 WHERE user_id = $2",
      [amount, senderId]
    );

    // 6. Credit receiver
    await client.query(
      "UPDATE wallets SET balance = balance + $1 WHERE user_id = $2",
      [amount, recipientId]
    );

    // 7. Record transaction
    await client.query(
      `INSERT INTO transactions (sender_id, receiver_id, amount)
       VALUES ($1, $2, $3)`,
      [senderId, recipientId, amount]
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