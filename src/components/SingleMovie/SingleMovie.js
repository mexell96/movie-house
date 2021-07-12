import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./SingleMovie.css";

import { noPicture } from "./../../consts";

const SingleMovie = (movie) => {
  const [picture, setPicture] = useState();

  useEffect(() => {
    movie?.poster === "N/A" ? setPicture(noPicture) : setPicture(movie.poster);
  }, [movie]);

  return (
    <Link
      to={`/movies/${movie.imdbID}`}
      key={movie.imdbID}
      className="media"
      onClick={() => window.scroll(0, 0)}>
      <img className="poster" src={picture} alt={movie.title} />
      <div>
        <div className="title">{movie.title}</div>
        <span className="sub-title">{movie.year}</span>
        <span className="sub-title capitalize">{movie.type}</span>
      </div>
    </Link>
  );
};

export { SingleMovie };
