import { FETCH_MOVIES } from "./types";

type ResultsMoviesPropsType = {
  type: string;
  payload: {
    data: MoviesResponseType;
    key: string;
  };
};

export const resultsMovies = (
  state: ResultsMoviesType = {},
  { type, payload }: ResultsMoviesPropsType
): ResultsMoviesType => {
  switch (type) {
    case FETCH_MOVIES:
      return {
        ...state,
        [payload.key]: {
          movies: payload.data.Search,
          totalResults: payload.data.totalResults,
        },
      };
    default:
      return state;
  }
};
