import { SET_SEARCH_VALUES } from "./types";

interface IRequest {
  input: string;
  page: number;
  key: string;
}

interface IReducerProps {
  type: string;
  searchValue: IRequest;
}

type InitialStateType = IRequest[];

export const previousSearches = (
  state: InitialStateType = [],
  { type, searchValue }: IReducerProps
): InitialStateType => {
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
