import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import "./PreviousSearches.css";

const PreviousRequests = () => {
  const previousSearches = useSelector((state) => state.previousSearches);

  return (
      <div className="previousSearches">
        {previousSearches &&
          previousSearches.map((request) => {
            const body = (
              <Link
                to={`/movies?s=${request.input}&page=${request.page}`}
                key={request.key}
                className="request"
                onClick={() => window.scroll(0, 0)}>
                <div className="information">
                  Looked for <span>{request.input}</span> on page{" "}
                  <span>{request.page}</span>
                </div>
              </Link>
            );
            return request.input && request.page && body;
          })}
      </div>
  );
};

export { PreviousRequests };
