const {
  registerUser,
  loginUser,
  forgotPasswordService,
  resetPasswordService
} = require("../services/authService");

// =====================
// REGISTER
// =====================
exports.register = async (req, res) => {
  try {
    const data = await registerUser(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// =====================
// LOGIN
// =====================
exports.login = async (req, res) => {
  try {
    const data = await loginUser(req.body);
    res.json(data);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

// =====================
// FORGOT PASSWORD
// =====================
exports.forgotPassword = async (req, res) => {
  try {
    const data = await forgotPasswordService(req.body.email);
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// =====================
// RESET PASSWORD
// =====================
exports.resetPassword = async (req, res) => {
  try {
    const data = await resetPasswordService({
      token: req.params.token,
      password: req.body.password
    });
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};