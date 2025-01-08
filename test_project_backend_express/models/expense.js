const { sequelize, DataTypes } = require("./Index");

// Define the Expense model
const Expense = sequelize.define("Expense", {
  expenseType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expenseAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  expenseDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  expenseCategory: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expenseDesc: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  userEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: "Users",
      key: "userEmail",
    },
  },
});

// Create associations between User and Expense
Expense.associate = (models) => {
  // An expense belongs to a user via userEmail
  Expense.belongsTo(models.User, { foreignKey: "userEmail" });
};

// Export the model
module.exports = Expense;
