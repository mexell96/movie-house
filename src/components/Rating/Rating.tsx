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
      value: number,
      shouldValidate?: boolean
    ) => void;
    errors: any;
    touched: any;
  };
};

const stars = [1, 2, 3, 4, 5];

const Rating = ({ field, form }: RatingType) => {
  const [hover, setHover] = useState(0);

  console.log(field, "field");
  console.log(form?.errors?.rating, "form");

  const setValues = () => {
    setHover(Number(field.value));
  };

  return (
    <RatingContainerStyled>
      <RatingContainerStartsStyled onMouseLeave={setValues}>
        {stars.map((star) => (
          <RatingStarStyled
            current={star <= (hover || field.value)}
            positionHover={hover || Number(field.value)}
            onMouseEnter={() => setHover(star)}
            onClick={() => form.setFieldValue("rating", star)}>
            <span className="star">&#9733;</span>
          </RatingStarStyled>
        ))}
      </RatingContainerStartsStyled>
      {form?.touched?.rating && (
        <RatingStarErrorStyled>{form?.errors?.rating}</RatingStarErrorStyled>
      )}
    </RatingContainerStyled>
  );
};

export { Rating };
