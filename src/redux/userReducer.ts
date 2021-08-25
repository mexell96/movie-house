import { SET_USER } from "./types";

const initialState = {
  token: "",
  user: {
    email: "",
    name: "",
    role: "",
    _id: "",
    avatar: "",
    theme: "",
    createdAt: "",
    updatedAt: "",
  },
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
      };
    default:
      return state;
  }
};
