import { FETCH_MOVIE } from "./types";

const initialState = {
  key: {},
};

export const resultMovie = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MOVIE:
      return {
        ...state,
        [action.key]: action.payload,
      };
    default:
      return state;
  }
};
