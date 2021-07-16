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
import { Dispatch } from "redux";

interface IRequest {
  input: string;
  page: number;
  key: string;
}

type SetSearchValueType = {
  type: typeof SET_SEARCH_VALUES;
  searchValue: IRequest;
};

export const setSearchValue = (searchValue: IRequest): SetSearchValueType => {
  return {
    type: SET_SEARCH_VALUES,
    searchValue,
  };
};

type ShowLoaderType = {
  type: typeof SHOW_LOADER;
};

export const showLoader = (): ShowLoaderType => {
  return {
    type: SHOW_LOADER,
  };
};

type HideLoaderType = {
  type: typeof HIDE_LOADER;
};

export const hideLoader = (): HideLoaderType => {
  return {
    type: HIDE_LOADER,
  };
};

type DataType = {
  Response: string;
  Search: object[];
  totalResults: string;
};

type NoDataType = {
  Error: string;
  Response: string;
};

export const fetchMovies = ({ input, page, key }: IRequest) => {
  return async (dispatch: Dispatch) => {
    dispatch(showLoader());
    const data: DataType | NoDataType = await getMovies(input, page);
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

type SetUrlType = {
  type: typeof SET_URL;
  searchValue: IRequest;
};

export const setUrl = (searchValue: IRequest): SetUrlType => {
  return {
    type: SET_URL,
    searchValue,
  };
};

type SetTabType = {
  type: typeof SET_TAB;
  tab: number;
};

export const setTab = (tab: number): SetTabType => {
  return {
    type: SET_TAB,
    tab,
  };
};
