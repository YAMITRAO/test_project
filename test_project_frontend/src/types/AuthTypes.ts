// login Purpose

// import SingUp from "../pages/Auth/SingUp";

export interface Login_Credentails {
  userEmail: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token?: string;
  data: {
    userName: string;
    userEmail: string;
    isProUser: boolean;
  };
}

// signup
export interface SignUp_Credentials extends Login_Credentails {
  userName: string;
  confirmPassword: string;
}

export interface SignUpResponse {
  message: string;
  data: {};
}

// reset password interface
export interface ResetPasswordApi_int extends Login_Credentails {
  otp: string;
  confirmPassword: string;
}
