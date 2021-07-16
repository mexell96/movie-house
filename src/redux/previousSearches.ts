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

const initialState = [
  {
    input: "",
    page: 1,
    key: "",
  },
];

type InitialStateType = typeof initialState;

export const previousSearches = (
  state: InitialStateType = initialState,
  { type, searchValue }: IReducerProps
): InitialStateType => {
  switch (type) {
    case SET_SEARCH_VALUES:
      return [
        ...state,
        {
          input: searchValue.input,
          page: +searchValue.page,
          key: searchValue.key,
        },
      ];
    default:
      return state;
  }
};
