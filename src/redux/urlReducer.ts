import { uniqueKey } from "../utils";
import { SET_URL } from "./types";

interface IRequest {
  input: string;
  page: number;
  key: string;
}
interface IReducerProps {
  type: string;
  searchValue: IRequest;
}

const initialState = {
  input: "",
  page: 1,
  key: uniqueKey(),
};

type InitialStateType = typeof initialState;

export const urlReducer = (
  state: InitialStateType = initialState,
  { type, searchValue }: IReducerProps
): InitialStateType => {
  switch (type) {
    case SET_URL:
      return {
        input: searchValue.input,
        page: searchValue.page,
        key: searchValue.key,
      };
    default:
      return state;
  }
};
