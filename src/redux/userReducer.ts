import { SET_USER } from "./types";

const initialState = {};

export const userReducer = (
  state: UserType | {} = initialState,
  { type, payload }: UserReducerPropsType
): UserType | {} => {
  switch (type) {
    case SET_USER:
      return {
        ...payload,
      };
    default:
      return state;
  }
};
