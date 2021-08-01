import { getMovies, getMovie } from "../apiFunctions";
import {
  FETCH_MOVIES,
  SET_SEARCH_VALUES,
  SET_URL,
  FETCH_MOVIE,
  HIDE_LOADER,
  SHOW_LOADER,
  SET_TAB,
  SET_REVIEW,
} from "./types";
import { Dispatch } from "redux";

export const setSearchValue = (
  searchValue: SearchInfoType
): ReducerPropsType => {
  return {
    type: SET_SEARCH_VALUES,
    searchValue,
  };
};

export const showLoader = () => {
  return {
    type: SHOW_LOADER,
  };
};

export const hideLoader = () => {
  return {
    type: HIDE_LOADER,
  };
};

export const fetchMovies = ({ input, page, key }: SearchInfoType) => {
  return async (dispatch: Dispatch) => {
    dispatch(showLoader());
    const data: MoviesResponseType = await getMovies(input, page);
    dispatch({ type: FETCH_MOVIES, data, key: key });
    dispatch(hideLoader());
  };
};

export const fetchMovie = (id: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(showLoader());
    const data: object = await getMovie(id);
    dispatch({ type: FETCH_MOVIE, data, key: id });
    dispatch(hideLoader());
  };
};

export const setUrl = (searchValue: SearchInfoType): ReducerPropsType => {
  return {
    type: SET_URL,
    searchValue,
  };
};

export const setTab = (tab: number): TabsPropsType => {
  return {
    type: SET_TAB,
    tab,
  };
};

export const setReview = (review: ReviewType, id: string) => {
  return {
    type: SET_REVIEW,
    review,
    id,
  };
};
