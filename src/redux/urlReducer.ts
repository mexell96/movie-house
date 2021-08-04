import { uniqueKey } from "../utils";
import { SET_URL } from "./types";

const initialState = {
  input: "",
  page: 1,
  key: uniqueKey(),
};

export const urlReducer = (
  state: SearchInfoType = initialState,
  { type, payload }: ReducerPropsType
): SearchInfoType => {
  switch (type) {
    case SET_URL:
      return {
        input: payload.input,
        page: payload.page,
        key: payload.key,
      };
    default:
      return state;
  }
};
