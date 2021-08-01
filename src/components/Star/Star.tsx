import { RatingStarStyled } from "./Star.style";

type StarPropsType = {
  star: number;
  setHover?: React.Dispatch<React.SetStateAction<number>>;
  form?: {
    setFieldValue: (
      field: string,
      value: number,
      shouldValidate?: boolean
    ) => void;
  };
  position: number;
  pointer?: boolean;
};

const Star = ({ star, setHover, form, position, pointer }: StarPropsType) => {
  return (
    <RatingStarStyled
      key={star}
      onMouseEnter={setHover && (() => setHover(star))}
      onClick={form && (() => form.setFieldValue("rating", star))}
      rating={star <= position ? position : 0}
      pointer={pointer}>
      <span className="star">&#9733;</span>
    </RatingStarStyled>
  );
};

export { Star };
