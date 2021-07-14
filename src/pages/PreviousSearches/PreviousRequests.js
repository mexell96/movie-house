import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { Wrapper, Request, Information } from "./styles";

const PreviousRequests = () => {
  const previousSearches = useSelector(
    ({ previousSearches }) => previousSearches
  );

  return (
    <Wrapper>
      {previousSearches &&
        previousSearches.map((request) => {
          const body = (
            <Request key={request.key}>
              <Link
                to={`/movies?s=${request.input}&page=${request.page}`}
                className="request"
                onClick={() => window.scroll(0, 0)}>
                <Information>
                  Looked for <span>{request.input}</span> on page{" "}
                  <span>{request.page}</span>
                </Information>
              </Link>
            </Request>
          );
          return request.input && request.page && body;
        })}
    </Wrapper>
  );
};

export { PreviousRequests };
