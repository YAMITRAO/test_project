const Expense = require("./expense");
const { sequelize, DataTypes } = require("./Index");
const bcrypt = require("bcryptjs");

const User = sequelize.define("User", {
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userEmail: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isProUser: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

// Before saving the user, hash the password
User.beforeCreate(async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
});

// Compare password for login
// User.prototype.comparePassword = async function (password) {
//   return bcrypt.compare(password, this.password);
// };

User.hasMany(Expense, { foreignKey: "userEmail" });

module.exports = User;
