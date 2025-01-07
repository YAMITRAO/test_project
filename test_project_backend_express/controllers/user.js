require("dotenv").config();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

module.exports = {
  userLogin,
  userSignup,
  getUser,
};
