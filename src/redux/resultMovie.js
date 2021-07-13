import { FETCH_MOVIE } from "./types";

const initialState = {
  key: {},
};

export const resultMovie = (state = initialState, { type, payload, key }) => {
  switch (type) {
    case FETCH_MOVIE:
      return {
        ...state,
        [key]: payload,
      };
    default:
      return state;
  }
};
