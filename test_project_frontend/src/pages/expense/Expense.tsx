import { useEffect, useState } from "react";
import ExpenseDetails from "./ExpenseDetails";
import ExpenseForm from "./ExpenseForm";
import axiosInt from "../../helper/ApiInstance";
import { ApiResponse } from "../../types/ApiTypes";
import { SingleExpense } from "../../types/Expense";
import ExpenseEntries from "./ExpenseEntries";
// import { categoryListArray } from "../../helper/CtaegotyList";

// import ExpensePiChart from "./ExpensePiChart";

const Expense = () => {
  const [expenseGetData, setExpenseGetData] = useState<SingleExpense[]>();
  const [incomeGetData, setIncomeGetData] = useState<SingleExpense[]>();
  const [allGetData, setallGetData] = useState<SingleExpense[]>();
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpense, setTotalExpense] = useState<number>(0);
  // for pagination
  const [totalExpensePages, setTotalExpensePages] = useState<number>(5);

  const [categoryStackForGraphExpense, setCategoryForGraphExpense] =
    useState<Record<string, number>>();

  const [categoryStackForGraphIncome, setCategoryForGraphIncome] =
    useState<Record<string, number>>();

  // to select graph according to the entries component selection
  // by default expense graph
  const [ExpenseGraph, setExpenseGraph] = useState("all");

  const onTypeSelection = (data: string) => {
    console.log("function calllledddddd Selected type is ", data);
    setExpenseGraph(data);
  };

  const getExpenseData = async (
    pageNumber = 0,
    pageLimit = 10,
    expense_type = "all"
  ) => {
    console.log("Valueeeeeeeeeeeeeeee", expense_type);
    try {
      let response = await axiosInt.get<ApiResponse<SingleExpense[]>>(
        `/expense?page=${pageNumber}&limit=${pageLimit}&expense_type=${expense_type}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage?.getItem("token")}`,
          },
        }
      );
      console.log("Expense get response is", response.data);
      console.log("pagessssssssssssssssssssssssss", response.data.total_pages);
      // set total pages
      setTotalExpensePages(
        response.data.total_pages ? response.data.total_pages : 0
      );
      let expenseArray: SingleExpense[] = [];
      let incomeArray: SingleExpense[] = [];
      // to show all entry at a time
      let allEntryArray: SingleExpense[] = [];
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
          allEntryArray.push(val);
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
          allEntryArray.push(val);
          setTotalIncome((prev) => prev + +val.expenseAmount);
        }
      });

      // expense array data
      setExpenseGetData(expenseArray);
      // income array data
      setIncomeGetData(incomeArray);
      // whole entries array
      setallGetData(allEntryArray);
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
              ExpenseGraph == "expense"
                ? categoryStackForGraphExpense
                  ? categoryStackForGraphExpense
                  : {}
                : ExpenseGraph == "income"
                ? categoryStackForGraphIncome
                  ? categoryStackForGraphIncome
                  : {}
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
          wholeArray={allGetData ? allGetData : []}
          onTypeSelection={onTypeSelection}
          // pagination pages from api
          totalExpensePages={totalExpensePages}
          callBack={getExpenseData}
        />
      </div>
    </div>
  );
};

export default Expense;
