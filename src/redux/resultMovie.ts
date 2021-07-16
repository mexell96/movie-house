import { FETCH_MOVIE } from "./types";

interface IReducerProps {
  type: string;
  data: object;
  key: string;
}

const initialState = {
  key: {},
};

type InitialStateType = typeof initialState;

export const resultMovie = (
  state: InitialStateType = initialState,
  { type, data, key }: IReducerProps
): InitialStateType => {
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
