import { useState } from "react";

import {
  RatingWrapperStyled,
  RatingStarErrorStyled,
  RatingWrapperStarsStyled,
} from "./Rating.style";

import { Star } from "../index";
import { stars } from "../../consts";

const Rating = ({ field, form }: FormikPropsType) => {
  const [hover, setHover] = useState(0);

  const setValues = () => {
    setHover(Number(field.value));
  };

  return (
    <RatingWrapperStyled>
      <RatingWrapperStarsStyled onMouseLeave={setValues}>
        {stars.map((star) => (
          <Star
            star={star}
            position={hover}
            setHover={setHover}
            form={form}
            pointer
          />
        ))}
      </RatingWrapperStarsStyled>
      {form?.touched?.rating && (
        <RatingStarErrorStyled>{form?.errors?.rating}</RatingStarErrorStyled>
      )}
    </RatingWrapperStyled>
  );
};

export { Rating };
