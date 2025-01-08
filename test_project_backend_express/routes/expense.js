const express = require("express");
const {
  addExpense,
  getExpense,
  deleteExpense,
  editExpense,
} = require("../controllers/expense");
const Auth = require("../middleware/Auth");

const router = express.Router();

router.post("/", Auth, addExpense);
router.get("/", Auth, getExpense);
router.put("/", Auth, editExpense);
router.delete("/:id", Auth, deleteExpense);

module.exports = router;
