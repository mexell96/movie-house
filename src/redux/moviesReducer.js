import { FETCH_MOVIES } from "./types";

const initialState = {
  movies: [],
};

export const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MOVIES:
      return {...state, movies: [...state.movies, action.payload]};
    default:
      return state;
  }
};
