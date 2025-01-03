import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axiosInt from "../../helper/ApiInstance";
import { ResetPasswordApi_int } from "../../types/AuthTypes";

const PasswordReset = () => {
  const navigate = useNavigate();
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isOtpValidated, setIsOtpValidated] = useState(false);
  const [isResendRequired, setIsResendRequired] = useState(false);
  const [enteredCredentials, setEnteredCredentials] =
    useState<ResetPasswordApi_int>({
      userEmail: "",
      password: "",
      confirmPassword: "",
      otp: "",
    });

  // const [confirmPassword, setConfirmPassword] = useState();

  // on change handler
  const inputChangehandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEnteredCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // password validator
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
  // form submit handler
  const formSubmithandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("data is", enteredCredentials);
    // check is mail valid or not
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(enteredCredentials.userEmail)) {
      alert("Enter a valid mail");
      return;
    }
    try {
      if (!isEmailValid) {
        const response = await axiosInt.post("/user/send-otp", {
          ...enteredCredentials,
        });
        console.log("Response is", response);
        toast.success("Otp sent to your email");
        setIsEmailValid(true);
        setTimeout(() => {
          setIsResendRequired(true);
        }, 5000);
      } else {
        if (!isOtpValidated) {
          const response = await axiosInt.post("/user/validate-otp", {
            ...enteredCredentials,
          });
          console.log("Response is", response);
          toast.success("Otp validated");
          setIsOtpValidated(true);
        } else {
          validateCredentials(); //to validate password before backend api check
          const response = await axiosInt.put("/user/change-password", {
            ...enteredCredentials,
          });
          console.log("Response is", response);
          toast.success("Password Changed successfully");
          navigate("/login");
        }
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  // resent otp handler
  const resendOtpHandler = async () => {
    try {
      setIsResendRequired(false);
      const response = await axiosInt.post("/user/send-otp", {
        ...enteredCredentials,
      });
      console.log("Response is", response);
      toast.success("Otp sent to your email");
      setIsEmailValid(true);
      setTimeout(() => {
        setIsResendRequired(true);
      }, 5000);
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      {/* container */}
      <div className="w-fit h-fit p-2 text-slate-200">
        {/* title */}
        {/* <h2 className="text-2xl text-center bg-slate-600 py-1 border-2 border-slate-400 rounded-md mb-6 px-2">
          Reset Password
        </h2> */}

        {
          <form className="min-w-[300px]" onSubmit={formSubmithandler}>
            {/* email  */}
            <div className="flex flex-col mb-1 ">
              <label className="text-xl font-mono">Email</label>
              <input
                name="userEmail"
                placeholder=" Enter Email"
                type="email"
                className="w-full h-[40px] rounded outline-none border-none indent-2 text-slate-700 font-mono font-medium"
                onChange={inputChangehandler}
                required
                readOnly={isEmailValid}
              />
            </div>
            {/* otp field */}
            {isEmailValid && (
              <div className="flex flex-col mb-1 ">
                <label className="text-xl font-mono">OTP</label>
                <input
                  name="otp"
                  placeholder="Enter Otp"
                  type="number"
                  maxLength={6}
                  minLength={6}
                  className="w-full h-[40px] rounded outline-none border-none indent-2 text-slate-700"
                  onChange={inputChangehandler}
                  required
                  readOnly={isOtpValidated}
                />
                {isResendRequired && !isOtpValidated && (
                  <div
                    className="text-green-700 font-medium cursor-pointer hover:text-green-800 hover:underline"
                    onClick={resendOtpHandler}
                  >
                    Resend Otp
                  </div>
                )}
              </div>
            )}
            {isOtpValidated && (
              <div>
                {/* password field */}
                <div className="flex flex-col mb-1 ">
                  <label className="text-xl font-mono">New Password</label>
                  <input
                    name="password"
                    placeholder="enter password "
                    type="password"
                    className="w-full h-[40px] rounded outline-none border-none indent-2 text-slate-700"
                    onChange={inputChangehandler}
                    required
                  />
                </div>
                {/* confirm password field */}
                <div className="flex flex-col mb-1 ">
                  <label className="text-xl font-mono">Confirm Password</label>
                  <input
                    name="confirmPassword"
                    placeholder=" Confirm password"
                    type="password"
                    className="w-full h-[40px] rounded outline-none border-none indent-2 text-slate-700"
                    onChange={inputChangehandler}
                    required
                  />
                </div>
              </div>
            )}

            {/* button submit to check mailid */}
            <div className="flex flex-col mb-1 w-[100%] mx-auto mt-4">
              {
                <button
                  type="submit"
                  className="bg-[#006d77] h-[35px] rounded-md border-none outline-none text-lg hover:bg-[#00535a] transition-all"
                >
                  {isEmailValid && !isOtpValidated
                    ? "Validate"
                    : isOtpValidated
                    ? "Reset"
                    : "Submit"}
                </button>
              }
            </div>
          </form>
        }
      </div>
    </div>
  );
};

export default PasswordReset;
