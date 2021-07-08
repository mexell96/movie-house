import { SET_SEARCH_VALUES } from "./types";

const initialState = {
  inputValue: "",
  page: 1,
};

export const searchValuesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_VALUES:
      return {
        inputValue: action.payload.inputValue,
        page: +action.payload.page,
      };
    default:
      return state;
  }
};
