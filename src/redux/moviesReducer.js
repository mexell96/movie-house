import { FETCH_MOVIES } from "./types";

const initialState = {
  movies: [],
  totalResults: "",
};

export const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MOVIES:
      return {
        ...state,
        movies: action.payload.Search,
        totalResults: action.payload.totalResults,
      };
    default:
      return state;
  }
};
