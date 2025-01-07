require("dotenv").config();
const jwt = require("jsonwebtoken");

const Auth = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      throw new Error("No token provided");
    }
    const bearerToken = token.split(" ")[1];

    if (!bearerToken) {
      throw new Error("Invalid token format");
    }
    const userDetails = jwt.verify(bearerToken, process.env.JWT_SECRET_KEY);
    req.userEmail = userDetails.userEmail;
    next();
  } catch (error) {
    res.status(400).json({
      message: "Invalid Login Token",
    });
  }
};

module.exports = Auth;
