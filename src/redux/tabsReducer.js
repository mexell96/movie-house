import { SET_TAB } from "./types";

const initialState = {
  tab: 0,
};

export const tabsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TAB:
      return { tab: action.payload };
    default:
      return state;
  }
};
