import { ToastContainer } from "react-toastify";
import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Auth/Login";
import Profile from "./pages/profile/Profile";
import DigitalClock from "./components/DigitalClock";
import SingUp from "./pages/Auth/SingUp";
import axiosInt from "./helper/ApiInstance";
import { useContext, useEffect, useState } from "react";
import { ApiResponse } from "./types/ApiTypes";
import { Get_user_data_int } from "./types/App";
import Layout from "./components/Layout";
import UserContext from "./context/user_context/UserContext";
import Expense from "./pages/expense/Expense";
import Spiner from "./components/later_useful/spiner";
import PasswordReset from "./pages/Auth/ResetPassword";

function App() {
  const { state, dispatch } = useContext(UserContext);
  console.log("USer context is", state);
  const [loading, setLoading] = useState(true);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: state.isAuth ? <Expense /> : <Login />,
        },
        {
          path: "/login",
          element: state.isAuth ? <Navigate to="/" /> : <Login />,
        },
        {
          path: "/signup",
          element: state.isAuth ? <Navigate to="/" /> : <SingUp />,
        },
        {
          path: "/reset-password",
          element: <PasswordReset />,
        },
        {
          path: "/profile",
          element: state.isAuth ? <Profile /> : <Login />,
        },
      ],
    },

    {
      path: "/test",
      element: <Spiner />,
    },
  ]);

  const getUser = async () => {
    setLoading(true);
    try {
      const response = await axiosInt.get<ApiResponse<Get_user_data_int>>(
        "/user/me",
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Resposne of me is:- ", response.data.data);
      dispatch({
        type: "USER_LOGIN",
        payload: { ...response.data.data, isAuth: true },
      });

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      {loading ? (
        <div className="w-full h-screen flex justify-center items-center text-xl font-medium text-slate-200 text-center">
          Loading...
        </div>
      ) : (
        <div className="bg-slate-700">
          <ToastContainer />
          <RouterProvider router={router} />
        </div>
      )}
    </>
  );
}

export default App;
