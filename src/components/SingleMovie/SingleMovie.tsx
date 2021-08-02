import { Link } from "react-router-dom";

import {
  SingleMovieMediaStyled,
  SingleMoviePosterStyled,
  SingleMovieTitleStyled,
  SingleMovieSubTitleStyled,
  SingleMovieSubTitleCapitalizerStyled,
} from "./SingleMovie.style";

import { getPicture } from "../../utils";

const SingleMovie = ({ key, imdbID, Poster, Title, Year, Type }: MovieType) => {
  return (
    <SingleMovieMediaStyled key={key}>
      <Link
        to={`/movies/${imdbID}`}
        key={imdbID}
        onClick={() => window.scroll(0, 0)}>
        <SingleMoviePosterStyled src={getPicture(Poster)} alt={Title} />
        <div>
          <SingleMovieTitleStyled>{Title}</SingleMovieTitleStyled>
          <SingleMovieSubTitleStyled>{Year}</SingleMovieSubTitleStyled>
          <SingleMovieSubTitleCapitalizerStyled>
            {Type}
          </SingleMovieSubTitleCapitalizerStyled>
        </div>
      </Link>
    </SingleMovieMediaStyled>
  );
};

export { SingleMovie };
