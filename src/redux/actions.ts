import { getMovies, getMovie } from "../apiFunctions";
import { IRequest } from "./interface";
import {
  FETCH_MOVIES,
  SET_SEARCH_VALUES,
  SET_URL,
  FETCH_MOVIE,
  HIDE_LOADER,
  SHOW_LOADER,
  SET_TAB,
} from "./types";
import { Dispatch } from "redux";

export function setSearchValue(searchValue: IRequest) {
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

export function fetchMovies({ input, page, key }: IRequest) {
  return async (dispatch: Dispatch) => {
    dispatch(showLoader());
    const data = await getMovies(input, page);
    dispatch({ type: FETCH_MOVIES, payload: data, key: key });
    dispatch(hideLoader());
  };
}

export function fetchMovie(id: string) {
  return async (dispatch: Dispatch) => {
    dispatch(showLoader());
    const data = await getMovie(id);
    dispatch({ type: FETCH_MOVIE, payload: data, key: id });
    dispatch(hideLoader());
  };
}

export function setUrl(searchValue: IRequest) {
  return {
    type: SET_URL,
    payload: searchValue,
  };
}

export function setTab(tab: number) {
  return {
    type: SET_TAB,
    payload: tab,
  };
}
