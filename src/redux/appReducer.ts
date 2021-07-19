import { SHOW_LOADER, HIDE_LOADER } from "./types";

interface IReducerProps {
  type: string;
}

export const appReducer = (state = false, { type }: IReducerProps) => {
  switch (type) {
    case SHOW_LOADER:
      return { loading: true };
    case HIDE_LOADER:
      return { loading: false };
    default:
      return state;
  }
};
