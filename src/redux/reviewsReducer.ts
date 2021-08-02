import { SET_REVIEW } from "./types";

type ReviewsReducerPropsType = {
  type: string;
  reviews: ReviewType[];
  id: string;
};

const initialState = {};

export const reviewsReducer = (
  state: ReviewsReducerType = initialState,
  { type, reviews, id }: ReviewsReducerPropsType
): ReviewsReducerType => {
  switch (type) {
    case SET_REVIEW:
      return {
        ...state,
        [id]: reviews,
      };
    default:
      return state;
  }
};
