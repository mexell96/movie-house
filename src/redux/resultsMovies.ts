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

type IData = {
  movies: Array<object>;
  totalResults: string;
};

type InitialStateType = {
  key: IData;
};

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
