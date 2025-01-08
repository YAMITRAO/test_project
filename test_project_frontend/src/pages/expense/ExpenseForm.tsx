import { useContext, useState } from "react";
import {
  categoryListArrayFromTypes,
  categoryListArrayIncomeFromTypes,
  ExpenseDataToApi_int,
  ExpenseFormProps_int,
} from "../../types/Expense";
import axiosInt from "../../helper/ApiInstance";
import axios from "axios";
import { toast } from "react-toastify";
import UserContext from "../../context/user_context/UserContext";

const ExpenseForm: React.FC<ExpenseFormProps_int> = ({ callBack }) => {
  const { state } = useContext(UserContext);

  const [categoryList, setCategoryList] = useState([
    ...categoryListArrayFromTypes,
  ]);

  const [expenseFormData, setExpenseFormData] = useState<ExpenseDataToApi_int>({
    expenseType: "expense",
    expenseAmount: "",
    expenseDate: "",
    expenseCategory: "other",
    expenseDesc: "",
  });
  console.log("the expense from data is:", expenseFormData);

  // const on Change handler
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExpenseFormData((prev) => ({ ...prev, [name]: value }));
  };

  // submit form data to api
  const formSubmithandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form data is", expenseFormData);

    try {
      let response = await axiosInt.post(
        "/expense",
        {
          ...expenseFormData,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage?.getItem("token")}`,
          },
        }
      );
      toast.success("Waw!!..Entry Added Successfully");
      callBack();
      console.log("Response of expense api is", response);
      setExpenseFormData({
        expenseType: "expense",
        expenseAmount: "",
        expenseDate: "",
        expenseCategory: "other",
        expenseDesc: "",
      });
    } catch (error) {
      console.log("error is", error);
      if (axios.isAxiosError(error)) {
        toast.error(
          Array.isArray(error.response?.data.message)
            ? error.response?.data.message[0]
            : error.response?.data.message
        );
      }
    }
  };

  return (
    <div className="w-[400px] h-auto px-2">
      {/* Form container */}
      <div className="dark:bg-slate-100 dark:text-slate-700 w-full h-full rounded p-2 ">
        <form className="w-full" onSubmit={formSubmithandler}>
          {/* top to select income or expense */}
          <div className="flex gap-4 justify-center">
            {/* expense selection */}
            <div className="flex gap-1">
              <input
                type="radio"
                name="expenseType"
                value="expense"
                checked={
                  expenseFormData.expenseType === "expense" ? true : false
                }
                className="peer"
                onChange={(e) => {
                  inputChangeHandler(e);
                  // update category list according to expense
                  setCategoryList([...categoryListArrayFromTypes]);
                }}
                required
              />
              <label className="text-slate-500 font-medium  peer-focus:text-slate-600 text-center ">
                Expense
              </label>
            </div>

            {/* income selection */}
            <div className="flex gap-1">
              <input
                type="radio"
                name="expenseType"
                value="income"
                className="peer"
                onChange={
                  state.isProUser
                    ? (e) => {
                        inputChangeHandler(e);
                        // update category list according to income
                        setCategoryList([...categoryListArrayIncomeFromTypes]);
                      }
                    : () => {
                        toast.error("Sorry!!! You are not a premium user");
                      }
                }
                required
              />
              <label className="text-slate-500 font-medium  peer-focus:text-slate-600 text-center ">
                Income
              </label>
            </div>
          </div>

          {/* expense entries */}
          <div className="w-full">
            {/* description */}
            <div className="flex flex-row-reverse items-center gap-2 p-1 mt-2">
              <input
                type="text"
                name="expenseDesc"
                value={expenseFormData.expenseDesc}
                className="w-full py-1 border-b-slate-500  border-b bg-transparent outline-none peer focus:border-b-slate-600 placeholder:font-medium px-1"
                required
                onChange={inputChangeHandler}
              />
              <label className="w-[25%] text-slate-500   peer-focus:text-slate-600 text-center">
                Purpose
              </label>
            </div>

            {/* amount */}
            <div className="flex flex-row-reverse items-center gap-2 p-1 mt-2">
              <input
                type="number"
                name="expenseAmount"
                value={expenseFormData.expenseAmount}
                className="w-full py-1 border-b-slate-500  border-b bg-transparent outline-none peer focus:border-b-slate-600"
                onChange={inputChangeHandler}
                required
              />
              <label className="w-[25%] text-slate-500  peer-focus:text-slate-600 text-center ">
                Amount
              </label>
            </div>
            {/* date */}
            <div className="flex flex-row-reverse items-center gap-2 p-1 mt-2">
              <input
                type="date"
                name="expenseDate"
                value={expenseFormData.expenseDate}
                className="w-full py-1 border-b-slate-500  border-b bg-transparent outline-none peer focus:border-b-slate-600 placeholder:font-medium px-1"
                onChange={(e) => {
                  if (new Date() < new Date(e.target.value)) {
                    alert("You can't add entries in future");
                    return;
                  }
                  inputChangeHandler(e);
                }}
                required
              />
              <label className="w-[25%] text-slate-500   peer-focus:text-slate-600 text-center">
                Date
              </label>
            </div>
            {/* category */}
            <div className="flex flex-row-reverse items-center gap-2 p-1 mt-2">
              <select
                className="w-full  py-1 border-b-slate-500  border-b bg-transparent outline-none peer focus:border-b-slate-600"
                name="expenseCategory"
                // value={expenseFormData.expenseCategory}
                onChange={(e) => {
                  const { name, value } = e.currentTarget;
                  setExpenseFormData((prev) => ({ ...prev, [name]: value }));
                }}
                required
              >
                {categoryList?.map((val) => {
                  return <option key={val}>{val}</option>;
                })}
              </select>
              <label className="w-[25%] text-slate-500 peer-focus:text-slate-600 text-center px-1">
                Category
              </label>
            </div>
          </div>

          {/* submit button */}
          <button
            type="submit"
            className="p-1 w-full bg-green-700 hover:bg-green-800 transition-all mt-2 rounded text-center border-none text-slate-100 text-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;
