const express = require("express");
const router = express.Router();
const { register, login, refreshToken, currentUser, logout } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/refresh-token", refreshToken);
router.get("/current-user", currentUser);
router.post("/logout", logout);

module.exports = router;


