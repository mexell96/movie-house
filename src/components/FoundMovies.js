import React from "react";

function FoundMovies({ arrMovies }) {
    return arrMovies.Search.map((movie) => {
        return (
            <div key={movie.imdbID}>
                <h2>{movie.Title}</h2>
                <img src={movie.Poster} alt={movie.Title} />
                <p>{movie.Plot}</p>
                <span>{movie.Year}</span>
            </div>
        );
    });
}

export default FoundMovies;
