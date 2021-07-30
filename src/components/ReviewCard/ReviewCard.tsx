import {
  ReviewsWindowStyled,
  ReviewsAvatarStyled,
  ReviewsAvatarWrapperStyled,
  ReviewsRatingStarStyled,
  ReviewsStarsWrapperStyled,
  ReviewsCommentStyled,
  ReviewsInfoWrapperStyled,
} from "./ReviewCard.style";

import { noPicture, stars } from "../../consts";

type ReviewCardPropsType = { review: ReviewType };

const ReviewCard = ({ review }: ReviewCardPropsType) => {
  return (
    <ReviewsWindowStyled>
      <ReviewsAvatarWrapperStyled>
        <ReviewsAvatarStyled src={noPicture} alt={review.name} />
      </ReviewsAvatarWrapperStyled>
      <ReviewsInfoWrapperStyled>
        <h2>{review.name}</h2>
        <ReviewsStarsWrapperStyled>
          {stars.map((star) => {
            return (
              <ReviewsRatingStarStyled
                key={review.rating}
                rating={star <= review.rating ? review.rating : 0}>
                <span className="star">&#9733;</span>
              </ReviewsRatingStarStyled>
            );
          })}
        </ReviewsStarsWrapperStyled>
        <ReviewsCommentStyled>{review.review}</ReviewsCommentStyled>
      </ReviewsInfoWrapperStyled>
    </ReviewsWindowStyled>
  );
};

export { ReviewCard };
