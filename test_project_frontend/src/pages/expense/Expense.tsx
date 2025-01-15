import { useEffect, useState } from "react";
import ExpenseDetails from "./ExpenseDetails";
import ExpenseForm from "./ExpenseForm";
import axiosInt from "../../helper/ApiInstance";
import { ApiResponse } from "../../types/ApiTypes";
import {  SingleExpense } from "../../types/Expense";
import ExpenseEntries from "./ExpenseEntries";
// import { categoryListArray } from "../../helper/CtaegotyList";

// import ExpensePiChart from "./ExpensePiChart";

const Expense = () => {
  const [expenseGetData, setExpenseGetData] = useState<SingleExpense[]>();
  const [incomeGetData, setIncomeGetData] = useState<SingleExpense[]>();
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpense, setTotalExpense] = useState<number>(0);

  const [categoryStackForGraphExpense, setCategoryForGraphExpense] =
    useState<Record<string, number>>();

  const [categoryStackForGraphIncome, setCategoryForGraphIncome] =
    useState<Record<string, number>>();

  // to select graph according to the entries component selection
  // by default expense graph
  const [isExpenseGraph, setIsExpenseGraph] = useState(true);

  const onTypeSelection = (data: boolean) => {
    console.log("function calllledddddd Selected type is ", data);
    setIsExpenseGraph(data);
  };

  const getExpenseData = async () => {
    try {
      let response = await axiosInt.get<ApiResponse<SingleExpense[]>>(
        "/expense",
        {
          headers: {
            Authorization: `Bearer ${localStorage?.getItem("token")}`,
          },
        }
      );
      // console.log("Expense get response is", response.data.data);
      let expenseArray: SingleExpense[] = [];
      let incomeArray: SingleExpense[] = [];
      setTotalExpense(0);
      setTotalIncome(0);

      // To store the category and there stack in an object for useState update
      let tempCategoryStackExpense: Record<string, number> = {};
      let tempCategoryStackIncome: Record<string, number> = {};

      response?.data?.data.map((val) => {
        if (val.expenseType === "expense") {
          //making an object for expense graph to update useState
          if (tempCategoryStackExpense[val.expenseCategory] >= 0) {
            tempCategoryStackExpense[val.expenseCategory] =
              tempCategoryStackExpense[val.expenseCategory] +
              Number(val.expenseAmount);
          } else {
            tempCategoryStackExpense[val.expenseCategory] = Number(
              val.expenseAmount
            );
          }
          expenseArray.push(val);
          setTotalExpense((prev) => prev + +val.expenseAmount);
        } else {
          //making an object for income graph to update useState
          if (tempCategoryStackIncome[val.expenseCategory] >= 0) {
            tempCategoryStackIncome[val.expenseCategory] =
              tempCategoryStackIncome[val.expenseCategory] +
              Number(val.expenseAmount);
          } else {
            tempCategoryStackIncome[val.expenseCategory] = Number(
              val.expenseAmount
            );
          }
          incomeArray.push(val);
          setTotalIncome((prev) => prev + +val.expenseAmount);
        }
      });

      // expense array data
      setExpenseGetData(expenseArray);
      // income array data
      setIncomeGetData(incomeArray);
      // for graph ploting
      setCategoryForGraphExpense(tempCategoryStackExpense);
      setCategoryForGraphIncome(tempCategoryStackIncome);
      // console.log("Tttttttttttest category stack is", testCategoryStack);
    } catch (error) {}
  };
  // console.log("Expense and income data ", expenseGetData, incomeGetData);
  // console.log("Total expense and income is", totalExpense, totalIncome);
  useEffect(() => {
    getExpenseData();
  }, []);
  return (
    <div className="w-[90%] mx-auto h-full flex flex-col gap-2 box-border relative ">
      {/* left part */}
      <div className="w-full h-auto flex flex-wrap justify-around items-center mt-10 ">
        {/* expense details */}
        <div className="w-fit  min-w-[400px]  h-auto ">
          <ExpenseDetails
            categoryStack={
              isExpenseGraph
                ? categoryStackForGraphExpense
                  ? categoryStackForGraphExpense
                  : {}
                : categoryStackForGraphIncome
                ? categoryStackForGraphIncome
                : {}
            }
            totalIncome={totalIncome}
            totalExpense={totalExpense}
            expenseArray={expenseGetData}
            callBack={() => getExpenseData()}
          />
        </div>
        {/* expense form */}
        <div className="w-fit  min-w-[400px] h-fit sm:mt-4 mt-0 ">
          <ExpenseForm callBack={() => getExpenseData()} />
        </div>
      </div>

      {/* right part */}
      <div className="w-full min-w-[400px] box-border h-full  flex">
        <ExpenseEntries
          incomeArray={incomeGetData ? incomeGetData : []}
          expenseArray={expenseGetData ? expenseGetData : []}
          onTypeSelection={onTypeSelection}
          callBack={() => getExpenseData()}
        />
      </div>
    </div>
  );
};

export default Expense;
