import { FETCH_MOVIES } from "./types";

const initialState = {
  key: { movies: [], totalResults: "" },
};

export const resultsMovies = (state = initialState, {type, payload, key}) => {
  switch (type) {
    case FETCH_MOVIES:
      return {
        ...state,
        [key]: {
          movies: payload.Search,
          totalResults: payload.totalResults,
        },
      };
    default:
      return state;
  }
};
