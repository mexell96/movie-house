import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { WrapperStyled, RequestStyled, InformationStyled } from "./styles";

const PreviousRequests = () => {
  const previousSearches = useSelector(
    ({ previousSearches }) => previousSearches
  );

  return (
    <WrapperStyled>
      {previousSearches &&
        previousSearches.map((request) => {
          const body = (
            <RequestStyled key={request.key}>
              <Link
                to={`/movies?s=${request.input}&page=${request.page}`}
                className="request"
                onClick={() => window.scroll(0, 0)}>
                <InformationStyled>
                  Looked for <span>{request.input}</span> on page{" "}
                  <span>{request.page}</span>
                </InformationStyled>
              </Link>
            </RequestStyled>
          );
          return request.input && request.page && body;
        })}
    </WrapperStyled>
  );
};

export { PreviousRequests };
