import { SET_TAB } from "./types";

const initialState = {
  tab: 0,
};

export const tabsReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_TAB:
      return { tab: payload };
    default:
      return state;
  }
};
