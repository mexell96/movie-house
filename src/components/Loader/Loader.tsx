import { LoaderStyle } from "./Loader.style";

import LoaderSvg from "../../img/loader.svg";

const Loader = () => {
  return (
    <LoaderStyle>
      <img src={LoaderSvg} alt="loader" />
    </LoaderStyle>
  );
};

export { Loader };
