const express = require("express");
const { userLogin, userSignup, getUser } = require("../controllers/user");
const Auth = require("../middleware/Auth");
const router = express.Router();

// login user
router.post("/user-login", userLogin);
// user signup
router.post("/user-signup", userSignup);
//get user
router.get("/me", Auth, getUser);

module.exports = router;
