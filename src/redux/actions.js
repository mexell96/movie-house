import { getMovies } from "../APIFunctions";
import { FETCH_MOVIES, SET_SEARCH_VALUES } from "./types";

export function setSearchValue(searchValue) {
  return {
    type: SET_SEARCH_VALUES,
    payload: searchValue,
  };
}

export function fetchMovies(inputValue, page) {
  return async (dispatch) => {
    const movies = await getMovies(inputValue, page);
    dispatch({ type: FETCH_MOVIES, payload: movies.data });
  };
}
