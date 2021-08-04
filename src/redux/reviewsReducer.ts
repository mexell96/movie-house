import { SET_REVIEW, SET_REVIEWS } from "./types";

type ReviewsReducerPropsType = {
  type: string;
  payload: any;
};

const initialState = {};

export const reviewsReducer = (
  state: ReviewsReducerType = initialState,
  { type, payload }: ReviewsReducerPropsType
): ReviewsReducerType => {
  switch (type) {
    case SET_REVIEW:
      const data = {
        ...state,
        [payload.id]: payload.reviews,
      };
      localStorage.setItem("Reviews", JSON.stringify(data));
      return data;
    case SET_REVIEWS:
      return { ...state, ...payload };
    default:
      return state;
  }
};
