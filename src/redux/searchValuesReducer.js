import { SET_SEARCH_VALUES } from "./types";

const initialState = {
  requests: [],
};

export const searchValuesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_VALUES:
      return {...state, requests: [...state.requests, action.payload]};
    default:
      return state;
  }
};
