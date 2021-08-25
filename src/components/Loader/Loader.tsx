import { LoaderStyled } from "./Loader.style";

import { ReactComponent as LoaderSvg } from "../../img/loader.svg";

const Loader = (): JSX.Element => {
  return (
    <LoaderStyled>
      <LoaderSvg />
    </LoaderStyled>
  );
};

export { Loader };
