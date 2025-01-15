import React from "react";

const LinerAnimation = ({ sliderValue1, isBetting }) => {
  return (
    <>
      {/* {isBetting ? ( */}
      <div
        className="white-bg"
        style={{
          position: "absolute",
          top: "-4px",
          background: "#fff",
          width: `${sliderValue1}%`,
          height: "20px",

          transition: "width 0.3s ease",
        }}
      ></div>
      {/* ) : null} */}
    </>
  );
};

export default LinerAnimation;
