import { FETCH_MOVIES } from "./types";

const initialState = {
  key: { movies: [], totalResults: "" },
};

export const resultsMovies = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MOVIES:
      return {
        ...state,
        [action.key]: {
          movies: action.payload.Search,
          totalResults: action.payload.totalResults,
        },
      };
    default:
      return state;
  }
};
