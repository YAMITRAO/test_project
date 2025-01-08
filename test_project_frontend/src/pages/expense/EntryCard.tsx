import { MdDelete } from "react-icons/md";
import { MdEditLocationAlt } from "react-icons/md";
import moment from "moment";
import { useContext, useState } from "react";
import { EntryCardProps_int, SingleExpense } from "../../types/Expense";
// import { categoryListArray } from "../../helper/CtaegotyList";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { RxCrossCircled } from "react-icons/rx";
import axios from "axios";
import { toast } from "react-toastify";
import axiosInt from "../../helper/ApiInstance";
import UserContext from "../../context/user_context/UserContext";

const EntryCard: React.FC<EntryCardProps_int> = ({
  val,
  index,
  categoryListArr,
  callBack,
}) => {
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [editEntry, setEditEntry] = useState<SingleExpense>();

  const { state } = useContext(UserContext);

  // to provide category at the time of edit
  const [categoryList] = useState([...categoryListArr]);

  // input change value handler
  const onChnageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("name and values", name, value);
    setEditEntry((prev) => {
      if (prev) return { ...prev, [name]: value };
    });
  };

  const editHandler = async () => {
    // first set edit entry to the value of that perticular index
    if (!isEditClicked) {
      setEditEntry(val);
      setIsEditClicked(true);
    } else {
      // prevent to send request if no changes made
      if (
        editEntry?.expenseAmount === val.expenseAmount &&
        editEntry?.expenseDate === val.expenseDate &&
        editEntry?.expenseDesc === val.expenseDesc &&
        editEntry?.expenseCategory === val.expenseCategory
      ) {
        toast.success("Saving without any change");
        setIsEditClicked(false);
        return;
      }
      //  send edited data to the api
      console.log("Edited data is:-", editEntry);
      try {
        const response = await axiosInt.put(
          "/expense",
          {
            id: editEntry!.id,
            expenseType: editEntry!.expenseType,
            expenseAmount: editEntry!.expenseAmount,
            expenseCategory: editEntry!.expenseCategory,
            expenseDate: editEntry!.expenseDate,
            expenseDesc: editEntry!.expenseDesc,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage?.getItem("token")}`,
            },
          }
        );

        console.log("response of edit entry is ", response);
        toast.success("Waw!!!..Successfully edited");
        // to remove the edit input to normal
        setIsEditClicked(false);
        // to fecth the expense entries (main function is at expense)
        if (callBack) callBack();
      } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data.message);
        }
      }
    }
  };

  // delete entry
  const deleteEntryHandler = async () => {
    console.log("you deleting the document", val.id);

    const confirm = window.confirm("Are you sure to delete this entry");
    if (!confirm) {
      // toast.error("Not deleted");
      return;
    }
    try {
      // confirm before delete

      const response = await axiosInt.delete(`/expense/${val.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage?.getItem("token")}`,
        },
      });
      console.log("response is", response);
      toast.success("Deleted Successfully");
      if (callBack) callBack();
    } catch (error) {
      console.log(error);
      toast.error("Error occured! try again later");
    }
  };
  return (
    <tr
      key={val.expenseDesc + index}
      className="odd:bg-slate-600 odd:text-slate-200 hover:bg-slate-300 hover:text-slate-900 even:bg-[#d4a373] even:text-slate-800 h-full"
    >
      <td className="border">{index + 1}</td>
      <td className="border">
        {!isEditClicked ? (
          moment(val.expenseDate).format("Do MMM YYYY")
        ) : (
          <input
            type="date"
            name="expenseDate"
            value={editEntry!.expenseDate}
            className="w-full h-fit border-none outline-none text-slate-600 "
            onChange={onChnageHandler}
          />
        )}
      </td>
      <td className="border">
        {!isEditClicked ? (
          val.expenseAmount
        ) : (
          <input
            type="text"
            name="expenseAmount"
            value={editEntry!.expenseAmount}
            className="w-full h-fit border-none outline-none text-slate-600 indent-[45%]"
            onChange={onChnageHandler}
          />
        )}
      </td>
      <td className="border">
        {!isEditClicked ? (
          val.expenseDesc
        ) : (
          <input
            type="text"
            name="expenseDesc"
            value={editEntry!.expenseDesc}
            className="w-full h-fit border-none outline-none text-slate-600 indent-[45%]"
            onChange={onChnageHandler}
          />
        )}
      </td>
      <td className="border">
        {!isEditClicked ? (
          val.expenseCategory
        ) : (
          <form>
            <select
              className="w-full h-fit border-none outline-none text-slate-600"
              value={editEntry!.expenseCategory}
              name="expenseCategory"
              onChange={(e) => {
                const { name, value } = e.currentTarget;
                console.log("name, and value", name, value);
                setEditEntry((prev) => {
                  if (prev) return { ...prev, [name]: value };
                });
              }}
            >
              {categoryList?.map((val) => {
                return <option key={val}>{val}</option>;
              })}
            </select>
          </form>
        )}
      </td>
      <td className="border">
        {!isEditClicked ? (
          //edit and delete button
          <span className="flex  justify-center gap-2">
            <span
              className="text-lg  text-green-700 hover:text-green-800 cursor-pointer"
              onClick={
                state.isProUser
                  ? editHandler
                  : () => {
                      toast.error("Sorry!!! You are not a preimum user.");
                    }
              }
            >
              <MdEditLocationAlt />
            </span>
            {/* delete button not in use yet so commented */}
            <span
              className="text-md text-red-700 hover:text-red-800 cursor-pointer"
              onClick={deleteEntryHandler}
            >
              <MdDelete />
            </span>
          </span>
        ) : (
          // editSubmit and cancle button
          <span className="flex  justify-center gap-2 text-xl ">
            <span
              className="  text-green-700 hover:text-green-800 cursor-pointer bg-white rounded-full"
              onClick={editHandler}
            >
              <IoCheckmarkCircleOutline />
            </span>
            <span
              className=" text-red-700 hover:text-red-800 cursor-pointer bg-white rounded-full"
              onClick={() => setIsEditClicked(false)}
            >
              <RxCrossCircled />
            </span>
          </span>
        )}
      </td>
    </tr>
  );
};

export default EntryCard;
