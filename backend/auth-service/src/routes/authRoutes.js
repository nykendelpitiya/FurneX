const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  googleAuth,
  getCurrentUser,
  forgotPassword,
  resetPassword
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google", googleAuth);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/me", protect, getCurrentUser);

module.exports = router;