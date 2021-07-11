import { SET_SEARCH_VALUES } from "./types";

const initialState = [
  {
    input: "",
    page: 1,
    key: "",
  },
];

export const previousSearches = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_VALUES:
      return [
        ...state,
        {
          input: action.payload.input,
          page: +action.payload.page,
          key: action.payload.input + "_" + +action.payload.page,
        },
      ];
    default:
      return state;
  }
};
