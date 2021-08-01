import { SET_REVIEW } from "./types";

type ReviewsReducerPropsType = {
  type: string;
  review: ReviewType;
  id: string;
};

const initialState = {};

export const reviewsReducer = (
  state: ReviewsReducerType = initialState,
  { type, review, id }: ReviewsReducerPropsType
): ReviewsReducerType => {
  if (type === SET_REVIEW) {
    const dataLS = JSON.parse(localStorage.getItem("Reviews") || "null");
    const reviewsLS: ReviewType[] = (dataLS && dataLS[id]) || [];
    reviewsLS.push(review);
    localStorage.setItem(
      "Reviews",
      JSON.stringify({ ...dataLS, [id]: reviewsLS })
    );
  }

  const reviews: ReviewType[] = (state && state[id]) || [];
  reviews.push(review);

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
