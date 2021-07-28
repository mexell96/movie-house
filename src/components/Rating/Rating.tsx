import {
  RatingContainerStyled,
  RatingStarStyled,
  RatingStarErrorStyled,
  RatingContainerStartsStyled,
} from "./Rating.style";
import { useState } from "react";

type RatingType = {
  form: {
    values: {
      rating: string;
    };
    initialValues: {
      rating: string;
    };
    setFieldValue: (field: string, value: number) => void;
  };
};

const Rating = ({ form }: RatingType) => {
  const [hover, setHover] = useState(0);
  const [error, setError] = useState(false);

  return (
    <RatingContainerStyled>
      <RatingContainerStartsStyled
        onMouseLeave={() => {
          setHover(Number(form.initialValues.rating));
          !form.values.rating ? setError(true) : setError(false);
        }}>
        {[...Array(5)].map((star, index) => {
          index = index + 1;
          return (
            <RatingStarStyled
              current={index <= (hover || form.values.rating)}
              bgColor={hover || Number(form.values.rating)}
              onMouseEnter={() => setHover(index)}
              onClick={() => form.setFieldValue("rating", index)}>
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
