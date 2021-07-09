import { HIDE_LOADER } from "./../consts";
import { getMovies } from "../APIFunctions";
import { SHOW_LOADER } from "../consts";
import { FETCH_MOVIES, SET_SEARCH_VALUES } from "./types";

export function setSearchValue(searchValue) {
  return {
    type: SET_SEARCH_VALUES,
    payload: searchValue,
  };
}

export function showLoader() {
  return {
    type: SHOW_LOADER,
  };
}

export function hideLoader() {
  return {
    type: HIDE_LOADER,
  };
}

export function fetchMovies(inputValue, page) {
  return async (dispatch) => {
    dispatch(showLoader());
    const movies = await getMovies(inputValue, page);

    setTimeout(() => {
      dispatch({ type: FETCH_MOVIES, payload: movies.data });
      dispatch(hideLoader());
    }, 500);
  };
}
