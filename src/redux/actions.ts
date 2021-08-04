import { Dispatch } from "redux";

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
  SET_REVIEWS,
} from "./types";

type ReviewPropsType = {
  id: string;
  reviews: ReviewType[];
};

export const setSearchValue = (
  searchValue: SearchInfoType
): ReducerPropsType => {
  return {
    type: SET_SEARCH_VALUES,
    payload: searchValue,
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
    dispatch({ type: FETCH_MOVIES, payload: { data, key } });
    dispatch(hideLoader());
  };
};

export const fetchMovie = (id: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(showLoader());
    const data: object = await getMovie(id);
    dispatch({ type: FETCH_MOVIE, payload: { data, key: id } });
    dispatch(hideLoader());
  };
};

export const setUrl = (searchValue: SearchInfoType): ReducerPropsType => {
  return {
    type: SET_URL,
    payload: searchValue,
  };
};

export const setTab = (props: TabsType): TabsPropsType => {
  return {
    type: SET_TAB,
    payload: props,
  };
};

export const setReview = (props: ReviewPropsType) => {
  return {
    type: SET_REVIEW,
    payload: props,
  };
};

export const setReviews = (props: ReviewsReducerType) => {
  return {
    type: SET_REVIEWS,
    payload: props,
  };
};
