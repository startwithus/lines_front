import React, { useState } from "react";
import { icon } from "../../utility/icon";

const AmountSection = ({ handlePlacebet, amount, setAmount, isBetting }) => {
  const MIN_AMOUNT = 10;
  const MAX_AMOUNT = 20000;

  const disableMin = Number(amount) === MIN_AMOUNT;
  const disableMax = Number(amount) === MAX_AMOUNT;

  const buttonStyle = (disabled) => ({
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
  });

  // Function to determine increment value based on the range
  const getIncrement = (currentValue) => {
    if (currentValue >= 10 && currentValue < 100) {
      return 10;
    } else if (currentValue >= 100 && currentValue < 1000) {
      return 100;
    } else if (currentValue >= 1000) {
      return 2000; // Double the value
    }
    return MIN_AMOUNT; // Default increment
  };

  // Function to decrease progress
  const decreaseProgress = () => {
    let numericValue = parseFloat(amount);
    if (isNaN(numericValue) || amount === "") {
      numericValue = MIN_AMOUNT;
    } else if (numericValue > MIN_AMOUNT) {
      const decrement = getIncrement(numericValue) / 2; // Decrement is half the increment
      numericValue = Math.max(numericValue - decrement, MIN_AMOUNT);
    }
    setAmount(numericValue.toFixed(2));
  };

  // Function to increase progress
  const handleIncrease = () => {
    let numericValue = parseFloat(amount);
    if (isNaN(numericValue) || amount === "") {
      numericValue = MIN_AMOUNT;
    } else {
      const increment = getIncrement(numericValue);
      numericValue = Math.min(numericValue + increment, MAX_AMOUNT);
    }
    setAmount(numericValue.toFixed(2));
  };

  return (
    <div className="action-pet-container">
      <div className="action-pet">
        <p>{amount}</p>
      </div>
      <div className="progress-bar-container">
        <div className="progress-bar">
          <span
            className="bet-progressbar"
            style={{
              width: `${(parseFloat(amount) / MAX_AMOUNT) * 100}%`, // Dynamically calculate width percentage
              backgroundColor: "#4caf50", // Example color
              height: "100%", // Ensure it fills the container
            }}
          ></span>
        </div>
      </div>
      <div className="select-bet-container">
        <div className="btn-incress-decress">
          <button
            onClick={decreaseProgress}
            className="btn-decressincress"
            disabled={disableMin}
            style={buttonStyle(disableMin)}
          >
            <img src={icon.downIcon} alt="Decrease" className="icon-shadow" />
          </button>
        </div>
        <div className="bet">
          <button className="btn-bet" onClick={handlePlacebet}>
            {/* {isBetting ? (
              <img src={icon.betLoader} className="bet-icon" alt="Loading" />
            ) : (
              "Place Bet"
            )} */}
            Place Bet
          </button>
        </div>
        <div className="btn-incress-decress">
          <button
            onClick={handleIncrease}
            className="btn-decressincress"
            disabled={disableMax}
            style={buttonStyle(disableMax)}
          >
            <img src={icon.upIcon} alt="Increase" className="icon-shadow" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AmountSection;
