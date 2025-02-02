import axios from "axios";
import { toast } from "react-toastify";
import axiosInt from "../../helper/ApiInstance";
import { ApiResponse } from "../../types/ApiTypes";
import { SignUp_Credentials, SignUpResponse } from "../../types/AuthTypes";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SingUp = () => {
  const navigate = useNavigate();
  const [enteredCredentials, setEnteredCredentials] =
    useState<SignUp_Credentials>({
      userName: "",
      userEmail: "",
      password: "",
      confirmPassword: "",
    });

  // input change handler
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEnteredCredentials((prev) => ({ ...prev, [name]: value }));
  };
  // credentials validation function
  const validateCredentials = () => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(enteredCredentials.userEmail)) {
      throw new Error("Invalid email");
    } else if (
      enteredCredentials.confirmPassword !== enteredCredentials.password
    ) {
      throw new Error("Passwords do not match");
    } else if (enteredCredentials.password.length < 8) {
      // const passwordRegex =
      //   /^(?=(.*[a-z]))(?=(.*[A-Z]))(?=(.*\d))(?=(.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]))[A-Za-z\d!@#$%^&*()_+[\]{};':"\\|,.<>/?]{8,}$/;
      throw new Error("Password must be 8 characters or more");
    }
  };
  // signUp function
  const apiSignUpHandler = async () => {
    console.log("enteredValues are", enteredCredentials);
    try {
      // validating credentials (if !validate it throw error that will be handled by catch block)
      validateCredentials();
      let response = await axiosInt.post<ApiResponse<SignUpResponse>>(
        `/user/user-signup`,
        {
          ...enteredCredentials,
        }
      );
      console.log("response is", response.data);
      toast.success(response.data.message || "Waw!!!Successfully got response");
      navigate("/login");
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        if (axios.isAxiosError(error)) {
          toast.error(
            Array.isArray(error.response?.data.message)
              ? error.response?.data.message[0]
              : error.response?.data.message
          );
          return;
        }
        toast.error(error.message);
      }
      console.log(error);
    }
  };
  return (
    <div>
      <div className="min-h-screen dark:bg-slate-700 bg-gray-100 py-6 flex flex-col justify-center sm:py-12 dark:text-slate-200">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          {/* background  */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 dark:bg-gradient-to-t dark:from-[#6a994e] dark:to-[#219ebc]  transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          {/* sign up details */}
          <div className="relative px-4 py-6 dark:bg-slate-900 dark:opacity-90 bg-white shadow-lg sm:rounded-3xl sm:px-20 dark:shadow-[1px_1px_2px_rgba(255,244,244)] animate-bounce-limited  ">
            {/* details input  */}
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold">SignUp</h1>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 dark:text-slate-200 text-gray-700 sm:text-lg sm:leading-7">
                  {/* user name */}
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="fullname"
                      name="userName"
                      type="text"
                      value={enteredCredentials.userName}
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 dark:border-slate-200Secondary dark:focus:border-slate-200 dark:text-slate-200 dark:bg-transparent text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Email address"
                      onChange={onChangeHandler}
                    />
                    <label
                      htmlFor="fullname"
                      className="absolute left-0 -top-3.5 text-gray-600 dark:text-slate-200Secondary text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 dark:peer-focus:text-slate-200 peer-focus:text-sm"
                    >
                      Full Name
                    </label>
                  </div>
                  {/* email */}
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="email"
                      name="userEmail"
                      value={enteredCredentials.userEmail}
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 dark:border-slate-200Secondary dark:focus:border-slate-200 dark:text-slate-200 dark:bg-transparent text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Email address"
                      onChange={onChangeHandler}
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-gray-600 dark:text-slate-200Secondary text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 dark:peer-focus:text-slate-200 peer-focus:text-sm"
                    >
                      Email Address
                    </label>
                  </div>
                  {/* password */}
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="password"
                      name="password"
                      type="password"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 dark:border-slate-200Secondary dark:focus:border-slate-200 dark:text-slate-200 dark:bg-transparent text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Password"
                      onChange={onChangeHandler}
                    />
                    <label
                      htmlFor="enteredPassword"
                      className="absolute left-0 -top-3.5 text-gray-600 dark:text-slate-200Secondary text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 dark:peer-focus:text-slate-200 peer-focus:text-sm"
                    >
                      Password
                    </label>
                  </div>
                  {/* confirm password */}
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="confirmpassword"
                      name="confirmPassword"
                      value={enteredCredentials.confirmPassword}
                      type="password"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 dark:border-slate-200Secondary dark:focus:border-slate-200 dark:text-slate-200 dark:bg-transparent text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Password"
                      onChange={onChangeHandler}
                    />
                    <label
                      htmlFor="confirmpassword"
                      className="absolute left-0 -top-3.5 text-gray-600 dark:text-slate-200Secondary text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 dark:peer-focus:text-slate-200 peer-focus:text-sm"
                    >
                      Confirm Password
                    </label>
                  </div>
                  {/* have na account */}
                  <div className="w-full text-sm">
                    <div className="w-fit">
                      Already have an account,{" "}
                      <Link
                        to="/login"
                        className=" text-green-600 hover:underline"
                      >
                        Login
                      </Link>
                    </div>
                  </div>
                  <div className="relative">
                    <button
                      className="bg-cyan-500 text-white rounded-md px-2 py-1 dark:text-white dark:bg-[#ae5c09] dark:hover:bg-[#904c07] hover:scale-105 transition-all"
                      onClick={apiSignUpHandler}
                    >
                      SignUp
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* google login button */}
            {/* <div className="w-full flex justify-center">
              <button className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                <svg
                  className="h-6 w-6 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  // xmlns:xlink="http://www.w3.org/1999/xlink"
                  width="800px"
                  height="800px"
                  viewBox="-0.5 0 48 48"
                  version="1.1"
                >
                  {" "}
                  <title>Google-color</title> <desc>Created with Sketch.</desc>{" "}
                  <defs> </defs>{" "}
                  <g
                    id="Icons"
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                  >
                    {" "}
                    <g
                      id="Color-"
                      transform="translate(-401.000000, -860.000000)"
                    >
                      {" "}
                      <g
                        id="Google"
                        transform="translate(401.000000, 860.000000)"
                      >
                        {" "}
                        <path
                          d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                          id="Fill-1"
                          fill="#FBBC05"
                        >
                          {" "}
                        </path>{" "}
                        <path
                          d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                          id="Fill-2"
                          fill="#EB4335"
                        >
                          {" "}
                        </path>{" "}
                        <path
                          d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                          id="Fill-3"
                          fill="#34A853"
                        >
                          {" "}
                        </path>{" "}
                        <path
                          d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                          id="Fill-4"
                          fill="#4285F4"
                        >
                          {" "}
                        </path>{" "}
                      </g>{" "}
                    </g>{" "}
                  </g>{" "}
                </svg>
                <span>Continue with Google</span>
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingUp;
