import {
  RatingContainerStyled,
  RatingStarErrorStyled,
  RatingContainerStarsStyled,
} from "./Rating.style";
import { useState } from "react";
import { Star } from "../index";

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

  const setValues = () => {
    setHover(Number(field.value));
  };

  return (
    <RatingContainerStyled>
      <RatingContainerStarsStyled onMouseLeave={setValues}>
        {stars.map((star) => (
          <Star
            star={star}
            position={hover}
            setHover={setHover}
            form={form}
            pointer
          />
        ))}
      </RatingContainerStarsStyled>
      {form?.touched?.rating && (
        <RatingStarErrorStyled>{form?.errors?.rating}</RatingStarErrorStyled>
      )}
    </RatingContainerStyled>
  );
};

export { Rating };
