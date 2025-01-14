import React from "react";

const LinerAnimation = ({ sliderValue }) => {
  return (
    <div
      className="white-bg"
      style={{
        position: "absolute",
        top: "-4px",
        background: "#fff",
        width: `${sliderValue}%`,
        height: "20px",
        transition: "width 0.3s ease",
      }}
    ></div>
  );
};

export default LinerAnimation;
