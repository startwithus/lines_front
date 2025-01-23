import React, { useState } from "react";
import { icon } from "../../utility/icon";

const AmountSection = ({
  handlePlacebet,
  amount,
  setAmount,
  isBetting,
  totalMultiplier,
  setResultData,
}) => {
  const MIN_AMOUNT = 10;
  const MAX_AMOUNT = 20000;

  const disableMin =
    Number(amount) === MIN_AMOUNT ||
    totalMultiplier < 1.05 ||
    totalMultiplier > 5000.0;
  const disableMax =
    Number(amount) === MAX_AMOUNT ||
    totalMultiplier < 1.05 ||
    totalMultiplier > 5000.0;
  const disableBet =
    isBetting || totalMultiplier < 1.05 || totalMultiplier > 5000.0;

  const buttonStyle = (disabled) => ({
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
  });

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

  const showIntermediateValue = (start, end, setFinalValue) => {
    const midpoint = (start + end) / 2;
    setAmount(midpoint.toFixed(2));
    setTimeout(() => {
      setFinalValue(end.toFixed(2));
    }, 200);
  };

  const decreaseProgress = () => {
    setResultData(false);
    let numericValue = parseFloat(amount);
    if (isNaN(numericValue) || amount === "") {
      numericValue = MIN_AMOUNT;
    } else if (numericValue > MIN_AMOUNT) {
      const decrement = getIncrement(numericValue) / 2;
      const targetValue = Math.max(numericValue - decrement, MIN_AMOUNT);
      showIntermediateValue(numericValue, targetValue, setAmount);
    } else {
      setAmount(MIN_AMOUNT.toFixed(2));
    }
  };

  const handleIncrease = () => {
    setResultData(false);

    let numericValue = parseFloat(amount);
    if (isNaN(numericValue) || amount === "") {
      numericValue = MIN_AMOUNT;
    } else {
      const increment = getIncrement(numericValue);
      const targetValue = Math.min(numericValue + increment, MAX_AMOUNT);
      showIntermediateValue(numericValue, targetValue, setAmount);
    }
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
              width: `${(parseFloat(amount) / MAX_AMOUNT) * 100}%`,
              backgroundColor: "#4caf50",
              height: "100%",
            }}
          ></span>
        </div>
      </div>
      <div className="select-bet-container">
        <div className="btn-incress-decress">
          <button
            onClick={decreaseProgress}
            className="btn-decressincress"
            disabled={disableMin || isBetting}
            style={buttonStyle(disableMin || isBetting)}
          >
            <img src={icon.downIcon} alt="Decrease" className="icon-shadow" />
          </button>
        </div>
        <div className="bet-button">
          <button
            className="btn-bet"
            onClick={handlePlacebet}
            disabled={disableBet}
            style={buttonStyle(disableBet)}
          >
            {isBetting ? (
              <img src={icon.betLoader} className="bet-icon" alt="Loading" />
            ) : (
              "BET"
            )}
          </button>
        </div>

        <div className="btn-incress-decress">
          <button
            onClick={handleIncrease}
            className="btn-decressincress"
            disabled={disableMax || isBetting}
            style={buttonStyle(disableMax || isBetting)}
          >
            <img src={icon.upIcon} alt="Increase" className="icon-shadow" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AmountSection;
