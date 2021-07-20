import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  SingleMovieMediaStyled,
  SingleMoviePosterStyled,
  SingleMovieTitleStyled,
  SingleMovieSubTitleStyled,
  SingleMovieSubTitleCapitalizerStyled,
} from "./SingleMovie.style";

import { noPicture } from "./../../consts";

interface IMovie {
  imdbID: string;
  title: string;
  poster: string;
  plot: string;
  year: string;
  type: string;
  key: string;
}

const SingleMovie = (movie: IMovie) => {
  const [picture, setPicture] = useState("");

  useEffect(() => {
    movie?.poster === "N/A" ? setPicture(noPicture) : setPicture(movie.poster);
  }, [movie]);

  return (
    <SingleMovieMediaStyled>
      <Link
        to={`/movies/${movie.imdbID}`}
        key={movie.imdbID}
        onClick={() => window.scroll(0, 0)}>
        <SingleMoviePosterStyled src={picture} alt={movie.title} />
        <div>
          <SingleMovieTitleStyled>{movie.title}</SingleMovieTitleStyled>
          <SingleMovieSubTitleStyled>{movie.year}</SingleMovieSubTitleStyled>
          <SingleMovieSubTitleCapitalizerStyled>
            {movie.type}
          </SingleMovieSubTitleCapitalizerStyled>
        </div>
      </Link>
    </SingleMovieMediaStyled>
  );
};

export { SingleMovie };
