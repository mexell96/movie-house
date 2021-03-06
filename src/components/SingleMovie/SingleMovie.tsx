import { Link } from "react-router-dom";

import {
  SingleMovieStyled,
  SingleMoviePosterStyled,
  SingleMovieTitleStyled,
  SingleMovieSubTitleStyled,
  SingleMovieSubTitleCapitalizerStyled,
} from "./SingleMovie.style";

import { getPicture } from "../../utils";

const SingleMovie = ({ imdbID, Poster, Title, Year, Type }: MovieType) => {
  return (
    <SingleMovieStyled>
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
    </SingleMovieStyled>
  );
};

export { SingleMovie };
