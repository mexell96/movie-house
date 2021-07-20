import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { WrapperStyled, RequestStyled, InformationStyled } from "./styles";

const PreviousMovies = () => {
  const viewedMovie: any = [];
  const resultMovie = useSelector(({ resultMovie }: any) => resultMovie);
  for (let key of Object.keys(resultMovie)) {
    const resultMovieNew = resultMovie[key];
    viewedMovie.push(resultMovieNew);
  }

  const singleRequest = (request: any) => {
    return (
      <RequestStyled key={request.imdbID}>
        <Link
          to={`/movies/${request.imdbID}`}
          onClick={() => window.scroll(0, 0)}>
          <InformationStyled>
            Looked for <span>{request.Title}</span>
          </InformationStyled>
        </Link>
      </RequestStyled>
    );
  };

  const Requests = () => {
    return (
      <>
        {viewedMovie.map((request: any) => {
          if (request.Title) return singleRequest(request);
          return null;
        })}
      </>
    );
  };

  return <WrapperStyled>{viewedMovie && Requests()}</WrapperStyled>;
};

export { PreviousMovies };
