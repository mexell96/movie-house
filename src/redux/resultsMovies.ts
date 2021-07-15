import { FETCH_MOVIES } from "./types";
import { IMovie } from "./interface";

interface IPayload {
  Response: string;
  Search: Array<IMovie>;
  totalResults: string;
}

interface IReducerProps {
  type: string;
  payload: IPayload;
  key: string;
}

const initialState = {
  key: { movies: [], totalResults: "" },
};

export const resultsMovies = (
  state = initialState,
  { type, payload, key }: IReducerProps
) => {
  switch (type) {
    case FETCH_MOVIES:
      return {
        ...state,
        [key]: {
          movies: payload.Search,
          totalResults: payload.totalResults,
        },
      };
    default:
      return state;
  }
};
