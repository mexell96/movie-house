import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { Wrapper, Request, Information } from "./styles";

const PreviousMovies = () => {
  const viewedMovie = [];
  const resultMovie = useSelector(({ resultMovie }) => resultMovie);

  for (let key of Object.keys(resultMovie)) {
    const resultMovieNew = resultMovie[key];
    viewedMovie.push(resultMovieNew);
  }

  return (
    <Wrapper>
      {viewedMovie &&
        viewedMovie.map((request) => {
          const body = (
            <Request key={request.imdbID}>
              <Link
                to={`/movies/${request.imdbID}`}
                onClick={() => window.scroll(0, 0)}>
                <Information>
                  Looked for <span>{request.Title}</span>
                </Information>
              </Link>
            </Request>
          );
          return request.Title && body;
        })}
    </Wrapper>
  );
};

export { PreviousMovies };
