import React, { useState } from "react";
import { BsTriangleFill } from "react-icons/bs";
import { TbTriangleInvertedFilled } from "react-icons/tb";

const AmountSection = () => {
  // State to manage progress (range: 0 to 100)
  const [progress, setProgress] = useState(50); // Initial value set to 50

  // Function to decrease progress
  const decreaseProgress = () => {
    setProgress((prev) => Math.max(prev - 10, 0)); // Decrease by 10, min value is 0
  };

  // Function to increase progress
  const increaseProgress = () => {
    setProgress((prev) => Math.min(prev + 10, 100)); // Increase by 10, max value is 100
  };

  return (
    <div className="action-pet-container">
      <div className="action-pet">
        <p>{progress.toFixed(2)}x</p>
      </div>
      <div className="progress-bar-container">
        <div className="progress-bar">
          <span
            className="bet-progressbar"
            style={{
              width: `${progress}%`,
              backgroundColor: "#4caf50", // Example color
              height: "100%", // Ensure it fills the container
            }}
          ></span>
        </div>
      </div>
      <div className="select-bet-container">
        <div className="btn-incress-decress">
          <button onClick={decreaseProgress}>
            <TbTriangleInvertedFilled style={{ fontSize: "23px" }} />
          </button>
        </div>
        <div className="bet">
          <button className="btn-bet">BET</button>
        </div>
        <div className="btn-incress-decress">
          <button onClick={increaseProgress}>
            <BsTriangleFill style={{ fontSize: "23px" }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AmountSection;
