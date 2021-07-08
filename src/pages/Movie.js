import React, { useEffect, useState } from "react";
import { getMovie } from "../APIFunctions";
import { useParams } from "react-router-dom";

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState();

  const fetchMovie = async () => {
    const { data } = await getMovie(id);
    setMovie(data);
  };

  useEffect(() => {
    fetchMovie();
  }, [id]);

  return (
    <>
      {movie && (
        <div>
          <h4>{movie.Title}</h4>
          <img src={movie.Poster} alt={movie.Title} />
          <span>{movie.Year}</span>
          <span>{movie.Plot}</span>
        </div>
      )}
      {!movie && <div>Loading...</div>}
    </>
  );
};

export { Movie };
