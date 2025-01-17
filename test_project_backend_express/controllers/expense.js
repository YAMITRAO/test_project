const Expense = require("../models/expense");

//to add an expense
const addExpense = async (req, res) => {
  console.log("Auth email id", req.userEmail);
  console.log("req.body", req.body);
  try {
    // add new expense
    const expense = await Expense.create({
      ...req?.body,
      userEmail: req.userEmail,
    });
    res.status(201).json({
      message: "Created successfully",
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// get expense
const getExpense = async (req, res) => {
  console.log("Bodddyyyy is", req.body);
  console.log("Query parameters", req.query);
  const { page, limit, expense_type } = req.query;
  try {
    const whereCondition = { userEmail: req.userEmail };

    // If expense_type is not 'all', add the filter for expenseType
    if (expense_type !== "all") {
      whereCondition.expenseType = expense_type; // Filter by the given expense_type (expense or income)
    }
    // total entries
    const totalEntries = await Expense.count({
      where: whereCondition,
    });

    // required entries
    const expenses = await Expense.findAll({
      where: whereCondition,
      limit: parseInt(limit),
      offset: parseInt(limit * page),
      order: [
        ["expenseDate", "DESC"], // Sort by  (ASC or DESC) WE CAN ALSO SEND IT FROM FRONTEND
      ],
    });

    let total_pages = Math.ceil(totalEntries / limit);
    res.status(200).json({
      message: "Success",
      data: expenses,
      total_pages,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
//edit expense entry
const editExpense = async (req, res) => {
  console.log("auth values,", req.userEmail);
  console.log("Request body is", req.body);
  try {
    const {
      expenseType,
      expenseAmount,
      expenseDate,
      expenseCategory,
      expenseDesc,
    } = req.body;
    // Check if the expense exists by expenseId
    const expense = await Expense.findOne({
      where: { id: req?.body?.id },
    });

    if (!expense) {
      throw new Error("Expense not found.");
    }

    // Check if the expense's userEmail matches the provided userEmail
    if (expense.userEmail !== req.userEmail) {
      throw new Error("You are not authorized to update this expense.");
    }

    // Prepare updated data
    const updatedData = {
      expenseType,
      expenseAmount,
      expenseDate,
      expenseCategory,
      expenseDesc,
    };

    // Update the expense
    await expense.update(updatedData);

    // Send success response
    res.status(200).json({ message: "Expense updated successfully." });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// delete expense
const deleteExpense = async (req, res) => {
  let deleteId = req.params.id;
  console.log("param is ", deleteId);
  try {
    const expense = await Expense.findOne({
      where: { id: deleteId },
    });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found." });
    }

    // Check if the expense belongs to the user with the given userEmail
    if (expense.userEmail !== req.userEmail) {
      throw new Error("You do not have permission to delete this expense.");
    }

    // Delete the expense
    await Expense.destroy({
      where: { id: deleteId },
    });

    // Send success response
    res.json({ message: "Expense deleted successfully." });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  addExpense,
  getExpense,
  editExpense,
  deleteExpense,
};
