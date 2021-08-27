import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import { message } from "antd";

import {
  ReviewCardWrapperStyled,
  ReviewCardAvatarStyled,
  ReviewCardAvatarWrapperStyled,
  ReviewCardStarsStyled,
  ReviewCardCommentStyled,
  ReviewCardInfoStyled,
  ReviewCardDeleteReviewStyled,
  ReviewCardHeaderStyled,
  ReviewCardMovieStyled,
  ReviewCardUserNameStyled,
} from "./ReviewCard.style";

import { Rating } from "..";
import { deleteReview } from "../../api/review";

type ReviewCardPropsType = {
  review: ReviewType;
  getUserReviewsFromDB?: () => Promise<void>;
  getReviewsFromDB?: () => Promise<void>;
};

const ReviewCard = ({
  review,
  getUserReviewsFromDB,
  getReviewsFromDB,
}: ReviewCardPropsType) => {
  const userReducer = useSelector(
    ({ userReducer }: RootStateType) => userReducer
  );

  const deleteReviewFn = async () => {
    const response = await deleteReview(review.uid);
    message.success(response.message);
    getUserReviewsFromDB && getUserReviewsFromDB();
    getReviewsFromDB && getReviewsFromDB();
  };

  return (
    <ReviewCardWrapperStyled>
      <ReviewCardAvatarWrapperStyled>
        <ReviewCardAvatarStyled src={review.avatar} alt={review.name} />
      </ReviewCardAvatarWrapperStyled>
      <ReviewCardInfoStyled>
        <ReviewCardHeaderStyled>
          <ReviewCardUserNameStyled>{review.name}</ReviewCardUserNameStyled>
          {userReducer.user.role && review.owner === userReducer.user._id && (
            <ReviewCardDeleteReviewStyled onClick={deleteReviewFn}>
              <CancelPresentationIcon color="error" />
            </ReviewCardDeleteReviewStyled>
          )}
        </ReviewCardHeaderStyled>
        <Link to={`/movies/${review.movieId}`}>
          <ReviewCardMovieStyled>{review.movie}</ReviewCardMovieStyled>
        </Link>
        <ReviewCardStarsStyled>
          <Rating value={review.rating} changeable={false} />
        </ReviewCardStarsStyled>
        <ReviewCardCommentStyled>{review.review}</ReviewCardCommentStyled>
      </ReviewCardInfoStyled>
    </ReviewCardWrapperStyled>
  );
};

export { ReviewCard };
