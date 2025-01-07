// models/index.js
const { Sequelize, DataTypes } = require("sequelize");

// Set up Sequelize connection to MySQL
const sequelize = new Sequelize({
  dialect: "mysql",
  host: "localhost", // Your MySQL host
  username: "root", // Your MySQL username
  password: "root", // Your MySQL password
  database: "testdb", // Your MySQL database name
  logging: false, // Optional, to disable logging of SQL queries
});

// Test the connection
sequelize
  .authenticate()
  .then(() => console.log("MySQL connected successfully."))
  .catch((error) => console.error("Unable to connect to MySQL:", error));

module.exports = { sequelize, DataTypes };
