import { useCallback, useContext } from "react";
import { useSelector } from "react-redux";
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
} from "./ReviewCard.style";

import { Rating } from "..";
import { useHttp } from "../../hooks/http.hook";
import { AuthContext } from "../../context/AuthContext";

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
  const { token, userId }: AuthContextType = useContext(AuthContext);
  const { request } = useHttp();
  const userReducer = useSelector(
    ({ userReducer }: RootStateType) => userReducer
  );

  const deleteReview = useCallback(async () => {
    try {
      const response = await request(
        `/api/profile-reviews/${review.uid}`,
        "DELETE",
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      message.success(response.message);
      getUserReviewsFromDB && getUserReviewsFromDB();
      getReviewsFromDB && getReviewsFromDB();
    } catch (e) {
      console.log(e, "Error profiles");
    }
  }, []);

  return (
    <ReviewCardWrapperStyled>
      <ReviewCardAvatarWrapperStyled>
        <ReviewCardAvatarStyled src={review.avatar} alt={review.name} />
      </ReviewCardAvatarWrapperStyled>
      <ReviewCardInfoStyled>
        <ReviewCardHeaderStyled>
          <h2>{review.name}</h2>
          {userReducer.role && review.owner === userId && (
            <ReviewCardDeleteReviewStyled onClick={deleteReview}>
              <CancelPresentationIcon color="error" />
            </ReviewCardDeleteReviewStyled>
          )}
        </ReviewCardHeaderStyled>
        <h2>{review.movie}</h2>
        <ReviewCardStarsStyled>
          <Rating value={review.rating} changeable={false} />
        </ReviewCardStarsStyled>
        <ReviewCardCommentStyled>{review.review}</ReviewCardCommentStyled>
      </ReviewCardInfoStyled>
    </ReviewCardWrapperStyled>
  );
};

export { ReviewCard };
