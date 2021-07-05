import React from "react";
import { Link } from "react-router-dom";

function FoundMovies({ arrMovies }) {
    return arrMovies.Search.map((movie) => {
        return (
            <div key={movie.imdbID}>
                <Link to={`/movies/${movie.imdbID}`}>
                    <h2>{movie.Title}</h2>
                </Link>

                <img src={movie.Poster} alt={movie.Title} />
                <p>{movie.Plot}</p>
                <span>{movie.Year}</span>
            </div>
        );
    });
}

export default FoundMovies;
