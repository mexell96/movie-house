import { FETCH_MOVIES } from "./types";

type DataType = {
  Response: string;
  Search: object[];
  totalResults: string;
};

interface IReducerProps {
  type: string;
  data: DataType;
  key: string;
}

const initialState = {
  key: { movies: [], totalResults: "" },
};

type InitialStateType = typeof initialState;

export const resultsMovies = (
  state: InitialStateType = initialState,
  { type, data, key }: IReducerProps
): InitialStateType => {
  switch (type) {
    case FETCH_MOVIES:
      return {
        ...state,
        [key]: {
          movies: data.Search,
          totalResults: data.totalResults,
        },
      };
    default:
      return state;
  }
};
