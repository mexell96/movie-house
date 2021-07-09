import { noPicture } from "./../../consts";
import "./SingleMovie.css";
import { Link } from "react-router-dom";

const SingleContent = (movie) => {
  let picture;
  if (movie.poster === "N/A") {
    picture = noPicture;
  } else {
    picture = movie.poster;
  }

  return (
    <div
      key={movie.imdbID}
      className="media"
      onClick={() => window.scroll(0, 0)}>
      <Link to={`/movies/${movie.imdbID}`}>
        <img className="poster" src={picture} alt={movie.title} />
        <div className="title">{movie.title}</div>
        <span className="sub-title">{movie.year}</span>
        <span className="sub-title capitalize">{movie.type}</span>
      </Link>
    </div>
  );
};

export default SingleContent;
