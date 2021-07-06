import { getMovies } from "../APIFunctions";
import { FETCH_MOVIES, SET_SEARCH_VALUES } from "./types";

export function setSearchValue(searchValue) {
  return {
    type: SET_SEARCH_VALUES,
    payload: searchValue,
  };
}

export function fetchMovies(inputValue) {
  return async (dispatch) => {
    const data = await getMovies(inputValue);
    dispatch({ type: FETCH_MOVIES, payload: data.data.Search });
  };
}
