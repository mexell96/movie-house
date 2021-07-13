import { SET_SEARCH_VALUES } from "./types";

const initialState = [
  {
    input: "",
    page: 1,
    key: "",
  },
];

export const previousSearches = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_SEARCH_VALUES:
      return [
        ...state,
        {
          input: payload.input,
          page: +payload.page,
          key: payload.key,
        },
      ];
    default:
      return state;
  }
};
