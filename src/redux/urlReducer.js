import { SET_URL } from "./types";

const initialState = {
  input: "",
  page: 1,
  key: "",
};

export const urlReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_URL:
      return {
        input: action.payload.input,
        page: +action.payload.page,
        key: action.payload.input + "_" + +action.payload.page,
      };
    default:
      return state;
  }
};
