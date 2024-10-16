import React from "react";
import Pinwheel from "./images/Pinwheel.gif";
const Loading = () => {
  return (
    <div className="flex justify-center align-center h-100">
      <img className="w-100 h-100" src={Pinwheel} alt="Loading..." />
    </div>
  );
};

export default Loading;
