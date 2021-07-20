import { LoaderStyled } from "./Loader.style";

import LoaderSvg from "../../img/loader.svg";

const Loader = () => {
  return (
    <LoaderStyled>
      <img src={LoaderSvg} alt="loader" />
    </LoaderStyled>
  );
};

export { Loader };
