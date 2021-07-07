import React, { useEffect, useState } from "react";
import { getMovie } from "../APIFunctions";
import { useParams } from "react-router-dom";

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState();

  useEffect(async () => {
    const mov = await getMovie(id);
    setMovie(mov.data);
  }, [id]);

  return (
    <div>
      {movie && (
        <div>
          <h4>{movie.Title}</h4>
          <img src={movie.Poster} alt={movie.Title} />
          <span>{movie.Year}</span>
          <span>{movie.Plot}</span>
        </div>
      )}
      {!movie && <div>Loading..</div>}
    </div>
  );
};

export { Movie };
