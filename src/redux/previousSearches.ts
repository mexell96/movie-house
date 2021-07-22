import { SET_SEARCH_VALUES } from "./types";

export const previousSearches = (
  state: PreviousSearchesType = [],
  { type, searchValue }: ReducerPropsType
): PreviousSearchesType => {
  switch (type) {
    case SET_SEARCH_VALUES:
      return [
        ...state,
        {
          input: searchValue.input,
          page: searchValue.page,
          key: searchValue.key,
        },
      ];
    default:
      return state;
  }
};
