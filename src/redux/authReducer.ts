import { LOGIN, LOGOUT } from "./types";

const initialState = {
  isAuth: false,
  user: {},
};

export const authReducer = (
  state = initialState,
  { type, payload }: any
): any => {
  switch (type) {
    case LOGIN:
      return { user: payload, isAuth: true };
    case LOGOUT:
      return { isAuth: false };
    default:
      return state;
  }
};
