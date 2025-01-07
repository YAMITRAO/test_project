export interface User {
  userName: string;
  userEmail: string;
  isAuth: boolean;
  isProUser: boolean;
}

export type UserAction =
  | { type: "USER_LOGIN"; payload: User }
  | { type: "UPDATE_USER"; payload: Partial<User> }
  | { type: "LOGOUT_USER" };

export interface UserContextValue {
  state: User;
  dispatch: React.Dispatch<UserAction>;
}

// initial values
export const intialValue: User = {
  userName: "",
  userEmail: "",
  isAuth: false,
  isProUser: false,
};

// UPDATE FUNCTION
export const reducerUpdate = (state: User, action: UserAction) => {
  console.log(state, action);
  switch (action.type) {
    case "USER_LOGIN":
      return { ...state, ...action.payload };

    case "UPDATE_USER":
      return { ...state, ...action.payload };

    case "LOGOUT_USER":
      return { ...intialValue };
  }

  return state;
};
