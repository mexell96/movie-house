import { uniqueKey } from "../utils";
import { SET_URL } from "./types";

const initialState = {
  input: "",
  page: 1,
  key: uniqueKey(),
};

export const urlReducer = (
  state: SearchInfoType = initialState,
  { type, searchValue }: ReducerPropsType
): SearchInfoType => {
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
