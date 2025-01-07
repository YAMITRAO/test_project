import { ToastContainer } from "react-toastify";
import "./App.css";
import NavBar from "./components/NavBar";
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
          path: "/login",
          element: state.isAuth ? <Navigate to="/" /> : <Login />,
        },
        {
          path: "/signup",
          element: state.isAuth ? <Navigate to="/" /> : <SingUp />,
        },
        {
          path: "/profile",
          element: state.isAuth ? <Profile /> : <Login />,
        },
      ],
    },

    {
      path: "/digitalwatch",
      element: <DigitalClock />,
    },
  ]);

  const getUser = async () => {
    setLoading(true);
    try {
      const response = await axiosInt.get<ApiResponse<Get_user_data_int>>(
        "/user/me",
        {
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
