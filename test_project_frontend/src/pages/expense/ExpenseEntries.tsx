import React, { useContext, useState } from "react";
import {
  categoryListArrayFromTypes,
  categoryListArrayIncomeFromTypes,
  ExpenseEntriesProps_int,
} from "../../types/Expense";
import EntryCard from "./EntryCard";
import UserContext from "../../context/user_context/UserContext";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";

const ExpenseEntries: React.FC<ExpenseEntriesProps_int> = ({
  expenseArray,
  incomeArray,
  wholeArray,
  onTypeSelection,
  callBack,
  totalExpensePages,
}) => {
  const { state } = useContext(UserContext);
  const [filterValue, setFilterValue] = useState("all");
  console.log("expense array is", expenseArray);
  console.log("income array is", incomeArray);

  // for pagination click
  const handlePageClick = (e: { selected: number }) => {
    // data back to the expense bca it has getExpense function
    callBack && callBack(e.selected, 10);
  };

  const filterHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    console.log("Selected value is", value);
    setFilterValue(value);
    onTypeSelection(value);
    callBack && callBack(0, 10, value);
  };

  return (
    <div className="w-full h-full  mt-4 ">
      {/* entries container */}
      <div className="h-full w-full flex flex-col gap-1  ">
        {/* expense entry */}
        <div className="w-full h-fit text-center flex flex-col ">
          {/* title */}
          <div className="font-medium text-xl font-mono ">Entries</div>
          {/* filter selection */}
          <div className="w-fit flex gap-2 mb-1 ">
            {/* selection based filtering */}
            <div className="w-fit">
              <select
                className="rounded-md p-1 outline-none"
                onChange={
                  state.isProUser
                    ? filterHandler
                    : () => toast("Sorry!!! Your are not a premium user")
                }
              >
                <option value="all">All</option>
                <option value={state.isProUser ? "expense" : "All"}>
                  Expense
                </option>
                <option value={state.isProUser ? "income" : "All"}>
                  Income
                </option>
              </select>
            </div>
          </div>
          {/* table */}
          <table className="w-full border">
            <thead>
              <tr>
                <th className="border">Sr</th>
                <th className="border">Type</th>
                <th className="border">Date</th>
                <th className="border">Amount</th>
                <th className="border">Purpose</th>
                <th className="border">Category</th>
                <th className="border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {(filterValue == "all"
                ? wholeArray
                : filterValue == "expense"
                ? expenseArray
                : incomeArray
              ).map((val, index) => {
                return (
                  <EntryCard
                    categoryListArr={
                      val.expenseType == "expense"
                        ? [...categoryListArrayFromTypes]
                        : [...categoryListArrayIncomeFromTypes]
                    }
                    val={val}
                    index={index}
                    key={val.expenseDesc + index}
                    callBack={callBack}
                  />
                );
              })}
              {/* map will be used for dynamic data */}
            </tbody>
          </table>
        </div>
      </div>
      {/* react paginate */}
      {totalExpensePages > 0 && (
        <div>
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={totalExpensePages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={1}
            onPageChange={handlePageClick}
            containerClassName={"pagination"} // This is important for styling
            activeClassName={"active"} // To apply styles to the active page
          />
        </div>
      )}
    </div>
  );
};

export default ExpenseEntries;
