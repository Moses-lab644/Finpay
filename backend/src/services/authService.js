const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// =====================
// REGISTER
// =====================
exports.registerUser = async ({ name, email, password }) => {
  // Check if user exists
  const userExists = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  if (userExists.rows.length > 0) {
    throw new Error("User already exists");
  }

  // Hash password
  const hashed = await bcrypt.hash(password, 10);

  // Create user
  const result = await pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
    [name, email, hashed]
  );

  const user = result.rows[0];

  // Create wallet automatically 
  await pool.query(
    "INSERT INTO wallets (user_id, balance) VALUES ($1, $2)",
    [user.id, 0]
  );

  return {
    message: "Signup successful",
    user
  };
};

// =====================
// LOGIN
// =====================
exports.loginUser = async ({ email, password }) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  if (result.rows.length === 0) {
    throw new Error("Invalid credentials");
  }

  const user = result.rows[0];

  // Compare password
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid credentials");

  // Generate token
  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return {
    message: "Login successful",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  };
};

// =====================
// FORGOT PASSWORD
// =====================
exports.forgotPasswordService = async (email) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  if (result.rows.length === 0) {
    throw new Error("User not found");
  }

  // Generate raw token
  const token = crypto.randomBytes(32).toString("hex");

  // Hash token for DB
  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  // Save to DB (with proper timestamp)
  await pool.query(
    "UPDATE users SET reset_token = $1, reset_token_expiry = $2 WHERE email = $3",
    [hashedToken, new Date(Date.now() + 3600000), email] // 1 hour
  );

  // For now (testing only)
  console.log("RESET TOKEN:", token);

  return {
    message: "Reset link sent (check console)"
  };
};

// =====================
// RESET PASSWORD
// =====================
exports.resetPasswordService = async ({ token, password }) => {
  // Hash incoming token
  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const result = await pool.query(
    "SELECT * FROM users WHERE reset_token = $1 AND reset_token_expiry > $2",
    [hashedToken, new Date()]
  );

  if (result.rows.length === 0) {
    throw new Error("Invalid or expired token");
  }

  const user = result.rows[0];

  // Hash new password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Update password & clear token
  await pool.query(
    "UPDATE users SET password = $1, reset_token = NULL, reset_token_expiry = NULL WHERE id = $2",
    [hashedPassword, user.id]
  );

  return {
    message: "Password reset successful"
  };
};