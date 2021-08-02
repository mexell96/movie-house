import {
  ReviewsWindowStyled,
  ReviewsAvatarStyled,
  ReviewsAvatarWrapperStyled,
  ReviewsStarsWrapperStyled,
  ReviewsCommentStyled,
  ReviewsInfoWrapperStyled,
} from "./ReviewCard.style";

import { stars } from "../../consts";
import { Star } from "../index";

type ReviewCardPropsType = {
  review: ReviewType;
  key: string;
};

const ReviewCard = ({ key, review }: ReviewCardPropsType) => {
  return (
    <ReviewsWindowStyled key={key}>
      <ReviewsAvatarWrapperStyled>
        <ReviewsAvatarStyled src={review.avatar} alt={review.name} />
      </ReviewsAvatarWrapperStyled>
      <ReviewsInfoWrapperStyled>
        <h2>{review.name}</h2>
        <ReviewsStarsWrapperStyled>
          {stars.map((star) => (
            <Star star={star} position={review.rating} />
          ))}
        </ReviewsStarsWrapperStyled>
        <ReviewsCommentStyled>{review.review}</ReviewsCommentStyled>
      </ReviewsInfoWrapperStyled>
    </ReviewsWindowStyled>
  );
};

export { ReviewCard };
