require("dotenv").config();
const express = require("express");
const cors = require("cors");

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

app.listen(PORT, () => {
  console.log("Server is running at:", PORT);
});
