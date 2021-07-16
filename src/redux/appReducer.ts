import { SHOW_LOADER, HIDE_LOADER } from "./types";

interface IReducerProps {
  type: string;
}

const initialState = {
  loading: false,
};

type InitialStateType = typeof initialState;

export const appReducer = (
  state: InitialStateType = initialState,
  { type }: IReducerProps
): InitialStateType => {
  switch (type) {
    case SHOW_LOADER:
      return { loading: true };
    case HIDE_LOADER:
      return { loading: false };
    default:
      return state;
  }
};
