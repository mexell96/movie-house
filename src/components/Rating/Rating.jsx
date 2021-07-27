import { RatingContainerStyled, RatingStarStyled } from "./Rating.style";
import { useState } from "react";

const Rating = ({ form }) => {
  const [hover, setHover] = useState(0);

  return (
    <RatingContainerStyled>
      {[...Array(5)].map((star, index) => {
        index = index + 1;
        return (
          <RatingStarStyled
            current={index <= (hover || form.values.rating)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(form.initialValues.rating)}
            onClick={() => form.setFieldValue("rating", index)}>
            <span className="star">&#9733;</span>
          </RatingStarStyled>
        );
      })}
    </RatingContainerStyled>
  );
};

export { Rating };
