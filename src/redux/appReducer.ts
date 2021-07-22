import { SHOW_LOADER, HIDE_LOADER } from "./types";

type AppReducerProps = {
  type: string;
};

const initialState = {
  loading: false,
};

export const appReducer = (
  state = initialState,
  { type }: AppReducerProps
): AppReducerType => {
  switch (type) {
    case SHOW_LOADER:
      return { loading: true };
    case HIDE_LOADER:
      return { loading: false };
    default:
      return state;
  }
};
