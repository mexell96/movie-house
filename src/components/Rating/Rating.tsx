import { useState } from "react";

import {
  RatingWrapperStyled,
  RatingStarErrorStyled,
  RatingWrapperStarsStyled,
  RatingStarStyled,
} from "./Rating.style";

import { stars } from "../../consts";

type RatingPropsType = {
  value: number;
  onChange?: (field: string, value: number) => void;
  errors?: string | undefined;
  touched?: boolean | undefined;
  changeable: boolean;
};

const Rating = ({
  onChange,
  value,
  errors,
  touched,
  changeable,
}: RatingPropsType) => {
  const [hoverPosition, setHoverPosition] = useState(value);

  return (
    <>
      {changeable && (
        <RatingWrapperStyled>
          <RatingWrapperStarsStyled
            onMouseLeave={() => setHoverPosition(value)}>
            {stars.map((star) => (
              <RatingStarStyled
                key={star}
                onMouseEnter={() => setHoverPosition(star)}
                onClick={onChange && (() => onChange("rating", star))}
                rating={star <= hoverPosition ? hoverPosition : 0}
                pointer={changeable}>
                <span className="star">&#9733;</span>
              </RatingStarStyled>
            ))}
          </RatingWrapperStarsStyled>
          {touched && errors && (
            <RatingStarErrorStyled>{errors}</RatingStarErrorStyled>
          )}
        </RatingWrapperStyled>
      )}
      {!changeable && (
        <RatingWrapperStyled>
          <RatingWrapperStarsStyled>
            {stars.map((star) => (
              <RatingStarStyled
                key={star}
                rating={star <= value ? value : 0}
                pointer={changeable}>
                <span className="star">&#9733;</span>
              </RatingStarStyled>
            ))}
          </RatingWrapperStarsStyled>
        </RatingWrapperStyled>
      )}
    </>
  );
};

export { Rating };
