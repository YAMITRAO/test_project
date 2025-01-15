require("dotenv").config();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Otp = require("../models/Otp");
const nodemailer = require("nodemailer");

// INSTANCE TO SEND MAIL
const transporter = nodemailer.createTransport({
  service: "gmail", // You can use other services or SMTP
  auth: {
    user: "test.2k25.rough@gmail.com", // Your email address
    pass: "loif krue ntor dfwh", // Your email password or app-specific password
  },
});

const userLogin = async (req, res) => {
  console.log("req url is", req.body);
  const { userEmail, password } = req.body;
  try {
    // find user
    const user = await User.findOne({ where: { userEmail } });
    if (!user) {
      throw new Error("Email does't exist");
    }
    // compare password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    console.log("Is the password valid ", isPasswordValid);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    let tempData = { id: user.id, userEmail: user.userEmail };
    console.log("tempData is ", tempData);
    const token = jwt.sign(
      tempData,
      process.env.JWT_SECRET_KEY, // Use a secret key for signing the JWT token
      { expiresIn: "1h" } // Set token expiration (e.g., 1 hour)
    );

    res.status(200).json({
      message: "Login successful",
      data: {
        token,
        data: {
          userName: user.userName,
          userEmail: user.userEmail,
          isProUser: user.isProUser,
        },
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const userSignup = async (req, res) => {
  console.log("req body is ", req.body);
  const { userName, userEmail, password, confirmPassword } = req.body;

  try {
    if (password != confirmPassword) {
      throw new Error("Password and confirmpassword must be same");
    }
    const existingUser = await User.findOne({ where: { userEmail } });
    console.log("User is ", existingUser);
    if (existingUser) {
      throw new Error("Email Already In Use");
    }

    const newUser = await User.create({
      userName,
      userEmail,
      password, // Password will be hashed in the model before saving
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        userName: newUser.userName,
        userEmail: newUser.userEmail,
        isProUser: newUser.isProUser,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

const getUser = async (req, res) => {
  console.log("User Value fom auth is ", req.userEmail);
  const userEmail = req.userEmail;
  try {
    // find user first
    const user = await User.findOne({ where: { userEmail } });
    if (!user) {
      throw new Error("User does't exist");
    }

    res.status(200).json({
      message: "Got User Successfully",
      data: {
        userName: user.userName,
        userEmail: user.userEmail,
        isProUser: user.isProUser,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// buy premium
const buyPremium = async (req, res) => {
  // console.log("req body is ", req.body);
  console.log("req.user", req.userEmail);
  let userEmail = req.userEmail;

  try {
    const existingUser = await User.findOne({ where: { userEmail } });
    console.log("User is ", existingUser);
    if (!existingUser) {
      throw new Error("User Not found");
    }
    if (existingUser.isProUser) {
      // If the user is already a pro, handle accordingly
      res.status(201).json({
        message: "You are already a premium user.",
      });
      return;
    }

    // Update the user's `isUserPro` field to true
    await existingUser.update({ isProUser: true });

    res.status(201).json({
      message: "You are now premium user.",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

const userResetOtp = async (req, res) => {
  console.log("req.body", req.body);
  try {
    // is user exits
    const user = await User.findOne({
      where: { userEmail: req.body.userEmail },
    });
    console.log("user is", user);
    if (!user) {
      throw new Error("Invalid Email! Check and Retry");
    }

    //generate an otp
    const otpPassword = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("Gerenared otp is:-", otpPassword);
    const hashedOtp = await bcrypt.hash(otpPassword, 10);
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10); // OTP valid for 10 minutes
    // if otp temp exist then first delete it and create new entries
    await Otp.destroy({
      where: {
        userEmail: req.body.userEmail, // or `createdBy: user._id` if the column in the OTP table is named `_id`
      },
    });
    // save that details to the temp otpmodel
    const newOtp = await Otp.create({
      userEmail: user.userEmail,
      otp: hashedOtp,
      expiredAt: expiresAt,
    });

    //send otp to the user's mail id
    const mailOptions = {
      from: "test.2k25.rough@gmail.com",
      to: "work.aky@gmail.com",
      subject: "Password Reset OTP",
      text: `Your OTP for resetting your password is: ${otpPassword}. It will expire in 10 minutes.`,
    };
    await transporter.sendMail(mailOptions);

    res.status(201).json({
      message: "OTP sent to given mail id",
      data: { otp: "Check you mail id" },
    });
  } catch (error) {
    res.status(400).json({
      message: error && error.message,
    });
  }
};

const userValidateOtp = async (req, res) => {
  console.log("user email and password is", req.body);
  try {
    // is user exits
    const user = await User.findOne({
      where: { userEmail: req.body.userEmail },
    });
    console.log("user is", user);
    if (!user) {
      throw new Error("Invalid Email! Check and Retry");
    }

    // access the otp model
    const otpDetails = await Otp.findOne({
      where: { userEmail: req.body.userEmail },
    });
    console.log("the otpmodel values are", otpDetails);
    if (!otpDetails) {
      throw new Error("Request Expired");
    }

    // OTp expired or not
    if (new Date(otpDetails.expiredAt) < new Date()) {
      throw new Error("Otp has been expired..");
    }

    // check is otp correct or not
    const isOtpValid = await bcrypt.compare(req?.body.otp, otpDetails.otp);
    if (!isOtpValid) {
      throw new Error("Incorrect Otp");
    }
    // if otp validated then delete that entry

    res.status(201).json({
      message: "OTP validated",
    });
  } catch (error) {
    res.status(400).json({
      message: error && error.message,
    });
  }
};
const userChnagePassword = async (req, res) => {
  console.log("user email and password is", req.body);

  try {
    // password and confirm password validation
    if (req?.body?.password !== req?.body?.confirmPassword) {
      console.log("Password is not same here....");
      throw new Error("Password and Confirm Password must be same");
    } else if (req?.body?.password.length < 8) {
      throw new Error("Password must be at least 8 characters long");
    }
    // is user exits
    const user = await User.findOne({
      where: { userEmail: req.body.userEmail },
    });
    console.log("user is", user);
    if (!user) {
      throw new Error("Invalid Email! Check and Retry");
    }

    // access the otp model
    const otpDetails = await Otp.findOne({
      where: { userEmail: req.body.userEmail },
    });
    console.log("the otpmodel values are", otpDetails);
    if (!otpDetails) {
      throw new Error("Request Expired");
    }

    // OTp expired or not
    if (new Date(otpDetails.expiredAt) < new Date()) {
      throw new Error("Otp has been expired..");
    }

    // check is otp correct or not
    const isOtpValid = await bcrypt.compare(req?.body.otp, otpDetails.otp);
    if (!isOtpValid) {
      throw new Error("Incorrect Otp");
    }

    // first hash the password and store to db
    const hashedNewPassword = await new bcrypt.hash(req?.body?.password, 10);

    // update that password to the user model
    // user.password = hashedNewPassword;
    await user.update({ password: hashedNewPassword });
    // also delete that entry from the otp model
    await Otp.destroy({
      where: {
        userEmail: req.body.userEmail, // or `createdBy: user._id` if the column in the OTP table is named `_id`
      },
    });

    res.status(201).json({
      message: "Waw! Password changed successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error && error.message,
    });
  }
};
module.exports = {
  userLogin,
  userSignup,
  getUser,
  buyPremium,
  userResetOtp,
  userValidateOtp,
  userChnagePassword,
};
