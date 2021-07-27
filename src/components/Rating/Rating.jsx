import { useState } from "react";
import "./index.css";

const Rating = (props) => {
  console.log(props, "props 7777");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  console.log(rating, "rating");

  return (
    <>
      <div role="group">
        {[...Array(5)].map((star, index) => {
          index = index + 1;
          return (
            <button
              name="rating"
              type="button"
              value={index}
              key={index}
              onChange={props.form.handleChange}
              className={
                index <= (hover || props.form.values.rating) ? "on" : "off"
              }
              onClick={() => setRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}>
              <span className="star">&#9733;</span>
            </button>
          );
        })}
      </div>
    </>
  );
};

export { Rating };
