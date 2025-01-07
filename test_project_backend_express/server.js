require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models/Index");

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

// user routes
app.use("/user", require("./routes/user"));

// test routes to test backend
app.use("/test", (req, res) => {
  res.json({
    message: "Yaaa Huuu!!!Backend is working fine...",
  });
});

app.listen(PORT, async () => {
  console.log("Server is running at:", PORT);
  try {
    await sequelize.sync(); // Sync Sequelize with the database
    console.log("Sequelize connected to database.");
  } catch (error) {
    console.error("Error syncing with the database:", error);
  }
});
