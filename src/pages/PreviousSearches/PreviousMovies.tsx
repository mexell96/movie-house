import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { WrapperStyled, RequestStyled, InformationStyled } from "./styles";

const singleRequest = (request: MovieType): JSX.Element => (
  <RequestStyled key={request.imdbID}>
    <Link
      to={`/movies/${request.imdbID}`}
      className="request"
      onClick={() => window.scroll(0, 0)}>
      <InformationStyled>
        Looked for <span>{request.Title}</span>
      </InformationStyled>
    </Link>
  </RequestStyled>
);

const Requests = (viewedMovie: MovieType[]): JSX.Element => (
  <>{viewedMovie.map((request: MovieType) => singleRequest(request))}</>
);

const PreviousMovies = (): JSX.Element => {
  const viewedMovie: MovieType[] = [];
  const resultsMovie = useSelector(
    ({ resultsMovie }: RootStateType) => resultsMovie
  );

  for (let key of Object.keys(resultsMovie)) {
    viewedMovie.push(resultsMovie[key]);
  }

  return <WrapperStyled>{viewedMovie && Requests(viewedMovie)}</WrapperStyled>;
};

export { PreviousMovies };
