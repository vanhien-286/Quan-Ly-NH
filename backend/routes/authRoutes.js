const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Trỏ thẳng đến hàm trong Controller
router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;