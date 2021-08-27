import { SET_USER } from "./types";

const initialState = {
  token: "",
  isAuth: false,
  user: {},
};

export const userReducer = (
  state: SetUserPropsType = initialState,
  { type, payload }: UserReducerPropsType
): SetUserPropsType => {
  switch (type) {
    case SET_USER:
      return {
        user: payload.user,
        token: payload.token,
        isAuth: payload.isAuth,
      };
    default:
      return state;
  }
};
