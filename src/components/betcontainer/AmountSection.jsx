import React, { useState } from "react";
import { icon } from "../../utility/icon";

const AmountSection = ({ handlePlacebet, amount, setAmount }) => {
  const MIN_AMOUNT = 10; // Define minimum amount
  const MAX_AMOUNT = 100; // Define maximum amount

  const disableMin = Number(amount) === MIN_AMOUNT;
  const disableMax = Number(amount) === MAX_AMOUNT;

  const buttonStyle = (disabled) => ({
    cursor: disabled ? "default" : "pointer",
    opacity: disabled ? 0.5 : 1,
  });

  // Function to increase the amount
  const handleIncrease = () => {
    let numericValue = parseFloat(amount);
    if (isNaN(numericValue) || amount === "") {
      numericValue = MIN_AMOUNT;
    } else {
      numericValue += MIN_AMOUNT;
      if (numericValue > MAX_AMOUNT) {
        numericValue = MAX_AMOUNT;
      }
    }
    setAmount(numericValue.toFixed(2));
  };

  // Function to decrease the amount
  const handleDecrease = () => {
    let numericValue = parseFloat(amount);
    if (isNaN(numericValue) || amount === "") {
      numericValue = MIN_AMOUNT;
    } else if (numericValue > MIN_AMOUNT) {
      numericValue -= MIN_AMOUNT;
    }
    numericValue = Math.max(MIN_AMOUNT, numericValue);
    setAmount(numericValue.toFixed(2));
  };

  return (
    <div className="action-pet-container">
      <div className="action-pet">
        <p>{amount}x</p>
      </div>
      <div className="progress-bar-container">
        <div className="progress-bar">
          <span
            className="bet-progressbar"
            style={{
              width: `${(amount / MAX_AMOUNT) * 100}%`,
              backgroundColor: "#4caf50", // Example color
              height: "100%", // Ensure it fills the container
            }}
          ></span>
        </div>
      </div>
      <div className="select-bet-container">
        <div className="btn-incress-decress">
          <button
            onClick={handleDecrease}
            className="btn-decressincress"
            style={buttonStyle(disableMin)}
            disabled={disableMin}
          >
            <img src={icon.downIcon} alt="" className="icon-shadow" />
          </button>
        </div>
        <div className="bet">
          <button className="btn-bet" onClick={handlePlacebet}>
            BET
          </button>
        </div>
        <div className="btn-incress-decress">
          <button
            onClick={handleIncrease}
            className="btn-decressincress"
            style={buttonStyle(disableMax)}
            disabled={disableMax}
          >
            <img src={icon.upIcon} alt="" className="icon-shadow" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AmountSection;
