import { HIDE_LOADER, SHOW_LOADER } from "../consts";
import { getMovies } from "../apiFunctions";
import { FETCH_MOVIES, SET_SEARCH_VALUES, SET_URL } from "./types";

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

export function fetchMovies(input, page, key) {
  return async (dispatch) => {
    dispatch(showLoader());
    const { data } = await getMovies(input, page);

    setTimeout(() => {
      dispatch({ type: FETCH_MOVIES, payload: data, key: key });
      dispatch(hideLoader());
    }, 500);
  };
}

export function setUrl(searchValue) {
  return {
    type: SET_URL,
    payload: searchValue,
  };
}
