import { SET_SEARCH_VALUES } from "./types";

export const previousSearches = (
  state: PreviousSearchesType = [],
  { type, payload }: ReducerPropsType
): PreviousSearchesType => {
  switch (type) {
    case SET_SEARCH_VALUES:
      return [
        ...state,
        {
          input: payload.input,
          page: payload.page,
          key: payload.key,
        },
      ];
    default:
      return state;
  }
};
