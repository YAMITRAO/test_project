const { sequelize, DataTypes } = require("./Index");
const User = require("./User");
// Define the Otp model
const Otp = sequelize.define(
  "Otp",
  {
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiredAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "otps",
  }
);

module.exports = Otp;
