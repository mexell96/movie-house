import {
  RatingContainerStyled,
  RatingStarStyled,
  RatingStarErrorStyled,
  RatingContainerStartsStyled,
} from "./Rating.style";
import { useState } from "react";

type RatingType = {
  field: {
    value: string;
  };
  form: {
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean
    ) => void;
  };
};

const stars = [1, 2, 3, 4, 5];

const Rating = ({ field, form }: RatingType) => {
  const [hover, setHover] = useState(0);
  const [error, setError] = useState(false);

  const setValues = () => {
    setHover(Number(field.value));
    setError(!field.value);
  };

  return (
    <RatingContainerStyled>
      <RatingContainerStartsStyled onMouseLeave={setValues}>
        {stars.map((star) => {
          return (
            <RatingStarStyled
              current={star <= (hover || field.value)}
              positionHover={hover || Number(field.value)}
              onMouseEnter={() => setHover(star)}
              onClick={() => form.setFieldValue("rating", star)}>
              <span className="star">&#9733;</span>
            </RatingStarStyled>
          );
        })}
      </RatingContainerStartsStyled>
      {error && <RatingStarErrorStyled>Choose a rating</RatingStarErrorStyled>}
    </RatingContainerStyled>
  );
};

export { Rating };
