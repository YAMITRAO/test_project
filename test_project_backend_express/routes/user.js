const express = require("express");
const {
  userLogin,
  userSignup,
  getUser,
  buyPremium,
  userResetOtp,
  userValidateOtp,
  userChnagePassword,
} = require("../controllers/user");
const Auth = require("../middleware/Auth");
const router = express.Router();

// login user
router.post("/user-login", userLogin);
// user signup
router.post("/user-signup", userSignup);
//get user
router.get("/me", Auth, getUser);
//user bought premium
router.put("/buypremium", Auth, buyPremium);

// get reset otp
router.post("/send-otp", userResetOtp);
// to validate otp
router.post("/validate-otp", userValidateOtp);
// reset password
router.put("/change-password", userChnagePassword);

module.exports = router;
