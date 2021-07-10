import "./Loader.css";

import LoaderSvg from "../../img/loader.svg";

const Loader = () => {
  return (
    <div className="loader">
      <img src={LoaderSvg} alt="loader" />
    </div>
  );
};

export { Loader };
