import {
  ReviewCardWrapperStyled,
  ReviewCardAvatarStyled,
  ReviewCardAvatarWrapperStyled,
  ReviewCardStarsStyled,
  ReviewCardCommentStyled,
  ReviewCardInfoStyled,
} from "./ReviewCard.style";

import { stars } from "../../consts";
import { Star } from "../index";

type ReviewCardPropsType = {
  review: ReviewType;
  key: string;
};

const ReviewCard = ({ key, review }: ReviewCardPropsType) => {
  return (
    <ReviewCardWrapperStyled key={key}>
      <ReviewCardAvatarWrapperStyled>
        <ReviewCardAvatarStyled src={review.avatar} alt={review.name} />
      </ReviewCardAvatarWrapperStyled>
      <ReviewCardInfoStyled>
        <h2>{review.name}</h2>
        <ReviewCardStarsStyled>
          {stars.map((star) => (
            <Star star={star} position={review.rating} />
          ))}
        </ReviewCardStarsStyled>
        <ReviewCardCommentStyled>{review.review}</ReviewCardCommentStyled>
      </ReviewCardInfoStyled>
    </ReviewCardWrapperStyled>
  );
};

export { ReviewCard };
