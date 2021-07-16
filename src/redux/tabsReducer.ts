import { SET_TAB } from "./types";

type IReducerProps = {
  type: string;
  tab: number;
};

const initialState = {
  tab: 0,
};

type InitialStateType = typeof initialState;

export const tabsReducer = (
  state: InitialStateType = initialState,
  { type, tab }: IReducerProps
): InitialStateType => {
  switch (type) {
    case SET_TAB:
      return { tab };
    default:
      return state;
  }
};
