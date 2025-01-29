import React, { use, useContext, useEffect, useRef, useState } from "react";
import { icon } from "../../utility/icon";
import { SoundContext } from "../../context/SoundContext";
import { playButtonSound } from "../../utility/gameSettings";
const AmountSection = ({
  handlePlacebet,
  amount,
  autobetTab,
  setAmount,
  isBetting,
  autobet,
  setAutobet,
  totalMultiplier,
  info,
}) => {
  const { sound } = useContext(SoundContext);
  const MIN_AMOUNT = 10;
  const MAX_AMOUNT = Math.min(info.balance, 10000.0);
  const autoBetInterval = useRef(null);
  const disableMin =
    Number(amount) === MIN_AMOUNT ||
    totalMultiplier < 1.05 ||
    totalMultiplier > 5000.0;
  const disableMax =
    Number(amount) === MAX_AMOUNT ||
    totalMultiplier < 1.05 ||
    totalMultiplier > 5000.0 ||
    info.balance < 10;
  const disableBet =
    isBetting || totalMultiplier < 1.05 || totalMultiplier > 5000.0;

  const buttonStyle = (disabled) => ({
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
  });
  useEffect(() => {
    if (autobet) {
      clearInterval(autoBetInterval.current);
      autoBetInterval.current = setInterval(() => handlePlacebet(), 1500);
    } else {
      clearInterval(autoBetInterval.current);
    }
  }, [autobet, handlePlacebet]);
  const handleStart = () => {
    if (autobetTab === 1) {
      setAutobet(true);
    }
  };
  const handleStop = () => {
    if (autobetTab === 1) {
      setAutobet(false);
    }
  };
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
    if (sound) {
      playButtonSound();
    }
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
    if (sound) {
      playButtonSound();
    }

    let numericValue = parseFloat(amount);
    if (isNaN(numericValue) || amount === "") {
      numericValue = MIN_AMOUNT;
    } else {
      const increment = getIncrement(numericValue);
      const targetValue = Math.min(numericValue + increment, MAX_AMOUNT);
      showIntermediateValue(numericValue, targetValue, setAmount);
    }
  };

  const handleMinClick = () => {
    if (sound) {
      playButtonSound();
    }
    setAmount(MIN_AMOUNT.toFixed(2)); // Set amount to MIN_AMOUNT
  };

  const handleMaxClick = () => {
    if (sound) {
      playButtonSound();
    }
    setAmount(MAX_AMOUNT.toFixed(2)); // Set amount to MAX_AMOUNT
  };

  return (
    <div className="action-pet-container">
      <div className="action-pet">
        <p>{amount}</p>
      </div>
      <div className="min-progress-max">
        <div className="">
          <button
            onClick={handleMinClick}
            disabled={disableMin || isBetting || autobet} // Disable when amount is at MIN_AMOUNT
            style={buttonStyle(disableMin || isBetting || autobet)}
          >
            MIN
          </button>
        </div>
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
        <div className="min-progress-max">
          <button
            onClick={handleMaxClick}
            disabled={disableMax || isBetting || autobet} // Disable when amount is at MAX_AMOUNT
            style={buttonStyle(disableMax || isBetting || autobet)}
          >
            MAX
          </button>
        </div>
      </div>
      <div className="select-bet-container">
        <div className="btn-incress-decress">
          <button
            onClick={decreaseProgress}
            className="btn-decressincress"
            disabled={disableMin || isBetting || autobet}
            style={buttonStyle(disableMin || isBetting || autobet)}
          >
            <img src={icon.downIcon} alt="Decrease" className="icon-shadow" />
          </button>
        </div>
        <div className="bet-button">
          {autobetTab === 1 ? (
            <>
              {autobet ? (
                <button
                  className="btn-bet"
                  style={{
                    cursor:
                      totalMultiplier < 1.05 || totalMultiplier > 5000.0
                        ? "not-allowed"
                        : "pointer",
                    opacity:
                      totalMultiplier < 1.05 || totalMultiplier > 5000.0
                        ? 0.5
                        : 1,
                  }}
                  onClick={() => {
                    if (totalMultiplier >= 1.05 && totalMultiplier <= 5000.0) {
                      handleStop();
                    }
                  }}
                  disabled={totalMultiplier < 1.05 || totalMultiplier > 5000.0}
                >
                  STOP AUTOPLAY
                </button>
              ) : (
                <button
                  className="btn-bet"
                  style={{
                    cursor:
                      totalMultiplier < 1.05 || totalMultiplier > 5000.0
                        ? "not-allowed"
                        : "pointer",
                    opacity:
                      totalMultiplier < 1.05 || totalMultiplier > 5000.0
                        ? 0.5
                        : 1, // Visual feedback for disabled state
                  }}
                  onClick={() => {
                    if (totalMultiplier >= 1.05 && totalMultiplier <= 5000.0) {
                      handleStart(); // Call handleStart only if conditions are met
                    }
                  }}
                  disabled={totalMultiplier < 1.05 || totalMultiplier > 5000.0} // Disable button when conditions are not met
                >
                  START AUTOPLAY
                </button>
              )}
            </>
          ) : (
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
          )}
        </div>

        <div className="btn-incress-decress">
          <button
            onClick={handleIncrease}
            className="btn-decressincress"
            disabled={disableMax || isBetting || autobet}
            style={buttonStyle(disableMax || isBetting || autobet)}
          >
            <img src={icon.upIcon} alt="Increase" className="icon-shadow" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AmountSection;
