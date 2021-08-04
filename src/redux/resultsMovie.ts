import { FETCH_MOVIE } from "./types";

type ResultsMoviePropsType = {
  type: string;
  payload: {
    data: MovieType;
    key: string;
  };
};

export const resultsMovie = (
  state: ResultsMovieType = {},
  { type, payload }: ResultsMoviePropsType
): ResultsMovieType => {
  switch (type) {
    case FETCH_MOVIE:
      return {
        ...state,
        [payload.key]: payload.data,
      };
    default:
      return state;
  }
};
