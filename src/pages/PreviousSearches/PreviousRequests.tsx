import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { WrapperStyled, RequestStyled, InformationStyled } from "./styles";

// type SingleRequestPropsType = {
//   request: object;
// };

const singleRequest = (request: any) => {
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

const Requests = (previousSearches: any) => {
  return (
    <>
      {previousSearches.map((request: any) => {
        if (request.input && request.page) return singleRequest(request);
        return null;
      })}
    </>
  );
};

const PreviousRequests = () => {
  const previousSearches: any = useSelector(
    ({ previousSearches }: any) => previousSearches
  );

  return (
    <WrapperStyled>
      {previousSearches && Requests(previousSearches)}
    </WrapperStyled>
  );
};

export { PreviousRequests };
