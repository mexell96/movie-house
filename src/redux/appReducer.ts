import { SHOW_LOADER, HIDE_LOADER } from "./types";

interface IReducerProps {
  type: string;
}

const initialState = {
  loading: false,
};

export const appReducer = (state = initialState, { type }: IReducerProps) => {
  switch (type) {
    case SHOW_LOADER:
      return { ...state, loading: true };
    case HIDE_LOADER:
      return { ...state, loading: false };
    default:
      return state;
  }
};
