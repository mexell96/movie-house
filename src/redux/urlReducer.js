import { SET_URL } from "./types";

const initialState = {
  input: "",
  page: 1,
  key: "",
};

export const urlReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_URL:
      return {
        input: payload.input,
        page: +payload.page,
        key: payload.input + "_" + +payload.page,
      };
    default:
      return state;
  }
};
