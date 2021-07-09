import React from "react";
import LoaderSvg from "../img/loader.svg";

function Loader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <img src={LoaderSvg} alt="loader" />
    </div>
  );
}

export default Loader;
