import React from "react";
import spinner from "./images/spinner.gif";
const Loading = () => {
  return (
    <div className="flex justify-center align-center h-100">
      <img className="w-100 h-100" src={spinner} alt="Loading..." />
    </div>
  );
};

export default Loading;
