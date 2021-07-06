import { APIFull } from "./../consts";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Movie = () => {
  let { id } = useParams();
  const [movie, setMovie] = useState();

  // useEffect(() => {
  //     fetchData(id);
  // }, [id]);

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
