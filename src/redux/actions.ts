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
  SET_USER,
} from "./types";

export const setSearchValue = (
  searchValue: SearchInfoType
): ReducerPropsType => ({
  type: SET_SEARCH_VALUES,
  payload: searchValue,
});

export const showLoader = () => ({
  type: SHOW_LOADER,
});

export const hideLoader = () => ({
  type: HIDE_LOADER,
});

export const fetchMovies =
  ({ input, page, key }: SearchInfoType) =>
  async (dispatch: Dispatch) => {
    dispatch(showLoader());
    const data: MoviesResponseType = await getMovies(input, page);
    dispatch({ type: FETCH_MOVIES, payload: { data, key } });
    dispatch(hideLoader());
  };

export const fetchMovie = (id: string) => async (dispatch: Dispatch) => {
  dispatch(showLoader());
  const data: object = await getMovie(id);
  dispatch({ type: FETCH_MOVIE, payload: { data, key: id } });
  dispatch(hideLoader());
};

export const setUrl = (searchValue: SearchInfoType): ReducerPropsType => ({
  type: SET_URL,
  payload: searchValue,
});

export const setTab = (props: TabsType): TabsPropsType => ({
  type: SET_TAB,
  payload: props,
});

export const setUser = (user: UserType | {}): UserReducerPropsType => ({
  type: SET_USER,
  payload: user,
});
