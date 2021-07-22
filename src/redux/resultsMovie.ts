import { FETCH_MOVIE } from "./types";

type ResultsMoviePropsType = {
  type: string;
  data: MovieType;
  key: string;
};

export const resultsMovie = (
  state: ResultsMovieType = {},
  { type, data, key }: ResultsMoviePropsType
): ResultsMovieType => {
  switch (type) {
    case FETCH_MOVIE:
      return {
        ...state,
        [key]: data,
      };
    default:
      return state;
  }
};
