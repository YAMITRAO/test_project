const express = require("express");
const { userLogin } = require("../controllers/user");
const router = express.Router();

// login user
router.post("/user-login", userLogin);

module.exports = router;
