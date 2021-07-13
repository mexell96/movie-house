import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Media,
  Poster,
  Title,
  SubTitle,
  SubTitleCapitalizer,
} from "./SingleMovie.style.js";

import { noPicture } from "./../../consts";

const SingleMovie = (movie) => {
  const [picture, setPicture] = useState();

  useEffect(() => {
    movie?.poster === "N/A" ? setPicture(noPicture) : setPicture(movie.poster);
  }, [movie]);

  return (
    <Media>
      <Link
        to={`/movies/${movie.imdbID}`}
        key={movie.imdbID}
        onClick={() => window.scroll(0, 0)}>
        <Poster src={picture} alt={movie.title}></Poster>
        <div>
          <Title>{movie.title}</Title>
          <SubTitle>{movie.year}</SubTitle>
          <SubTitleCapitalizer>{movie.type}</SubTitleCapitalizer>
        </div>
      </Link>
    </Media>
  );
};

export { SingleMovie };
