import { getMovies, getMovie } from "../apiFunctions";
import {
  FETCH_MOVIES,
  SET_SEARCH_VALUES,
  SET_URL,
  FETCH_MOVIE,
  HIDE_LOADER,
  SHOW_LOADER,
  SET_TAB,
} from "./types";

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
    dispatch({ type: FETCH_MOVIES, payload: data, key: key });
    dispatch(hideLoader());
  };
}

export function fetchMovie(id) {
  return async (dispatch) => {
    dispatch(showLoader());
    const { data } = await getMovie(id);
    dispatch({ type: FETCH_MOVIE, payload: data, key: id });
    dispatch(hideLoader());
  };
}

export function setUrl(searchValue) {
  return {
    type: SET_URL,
    payload: searchValue,
  };
}

export function setTab(tab) {
  return {
    type: SET_TAB,
    payload: tab,
  };
}
