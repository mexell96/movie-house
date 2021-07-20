import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { WrapperStyled, RequestStyled, InformationStyled } from "./styles";

import { RootState } from "../../redux/rootReducer";

const PreviousMovies = () => {
  const viewedMovie = [];
  const resultMovie: any = useSelector(
    ({ resultMovie }: RootState) => resultMovie
  );

  for (let key of Object.keys(resultMovie)) {
    const resultMovieNew = resultMovie[key];
    viewedMovie.push(resultMovieNew);
  }

  return (
    <WrapperStyled>
      {viewedMovie &&
        viewedMovie.map((request) => {
          const body = (
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
          return request.Title && body;
        })}
    </WrapperStyled>
  );
};

export { PreviousMovies };
