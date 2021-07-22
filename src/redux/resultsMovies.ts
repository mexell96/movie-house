import { FETCH_MOVIES } from "./types";

type ResultsMoviesPropsType = {
  type: string;
  data: MoviesResponseType;
  key: string;
};

export const resultsMovies = (
  state: ResultsMoviesType = {},
  { type, data, key }: ResultsMoviesPropsType
): ResultsMoviesType => {
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
