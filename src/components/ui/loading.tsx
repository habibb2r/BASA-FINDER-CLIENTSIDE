import React from "react";
import "../../app/spinner.css";

const Loading = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="spinner">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default Loading;
