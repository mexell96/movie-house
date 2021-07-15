import { FETCH_MOVIE } from "./types";

interface IPayload {
  Response: string;
  Search: Array<Object>;
  totalResults: string;
}

interface IReducerProps {
  type: string;
  payload: IPayload;
  key: string;
}

const initialState = {
  key: {},
};

export const resultMovie = (
  state = initialState,
  { type, payload, key }: IReducerProps
) => {
  switch (type) {
    case FETCH_MOVIE:
      return {
        ...state,
        [key]: payload,
      };
    default:
      return state;
  }
};
