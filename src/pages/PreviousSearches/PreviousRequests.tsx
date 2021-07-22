import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { WrapperStyled, RequestStyled, InformationStyled } from "./styles";

const singleRequest = (request: SearchInfoType) => {
  return (
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
};

const Requests = (previousSearches: SearchInfoType[]) => (
  <>
    {previousSearches.map((request: SearchInfoType) => singleRequest(request))}
  </>
);

const PreviousRequests = () => {
  const previousSearches = useSelector(
    ({ previousSearches }: RootStateType) => previousSearches
  );

  return (
    <WrapperStyled>
      {previousSearches && Requests(previousSearches)}
    </WrapperStyled>
  );
};

export { PreviousRequests };
