import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import "./PreviousSearches.css";

const PreviousMovies = () => {
  const viewedMovie = [];
  const resultMovie = useSelector((state) => state.resultMovie);

  for (let key of Object.keys(resultMovie)) {
    const resultMovieNew = resultMovie[key];
    viewedMovie.push(resultMovieNew);
  }

  return (
    <div className="previousSearches">
      {viewedMovie &&
        viewedMovie.map((request) => {
          const body = (
            <Link
              to={`/movies/${request.imdbID}`}
              key={request.imdbID}
              className="request"
              onClick={() => window.scroll(0, 0)}>
              <div className="information">
                Looked for <span>{request.Title}</span>
              </div>
            </Link>
          );
          return request.Title && body;
        })}
    </div>
  );
};

export { PreviousMovies };
