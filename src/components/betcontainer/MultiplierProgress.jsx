import React, { useEffect, useState } from "react";
import { icon } from "../../utility/icon";
import LinerAnimation from "./LinerAnimation";

const MultiplierProgress = ({
  setAutoMultiplier,
  autoMultiplier,
  currentMax,
  isBetting,
  autoValue,
  sliderValue1,
  setSliderValue1,
  resultData,
}) => {
  const [sliderValue, setSliderValue] = useState(50); // Slider value
  const [matchMaxMultiplier, setMatchMaxMultiplier] = useState(null); // Max multiplier from socket data
  const [isActive, setIsActive] = useState(false);

  // Handle slider interaction
  const handleMouseDown = () => setIsActive(true);
  const handleMouseUp = () => setIsActive(false);

  // Update slider value and calculate multiplier
  const handleSliderChange = (e) => {
    const newValue = parseFloat(e.target.value);
    setSliderValue(newValue);

    let mappedMultiplier;

    if (newValue <= 2) {
      mappedMultiplier = 0.93 + (newValue - 1) * 0.01; // Increment by 0.01 for values between 1 and 2
    } else if (newValue <= 10) {
      mappedMultiplier = 1.1 + (newValue - 2) * 0.03; // Increment by 0.03 for values between 2 and 10
    } else if (newValue <= 50) {
      mappedMultiplier = 2.0 + (newValue - 10) * 0.07; // Increment by 0.07 for values between 10 and 50
    } else if (newValue <= 100) {
      mappedMultiplier = 5.0 + (newValue - 50) * 0.76; // Increment by 0.1 for values between 50 and 100
    } else if (newValue > 100) {
      mappedMultiplier = 1000.0 + (newValue - 100) * 100; // Increment by 0.5 for values above 100
    }

    // Cap the value at 1000.00
    if (mappedMultiplier > 1000) {
      mappedMultiplier = 1000.0;
    }

    // Set the updated multiplier value with a fixed precision of 2 decimal places
    setAutoMultiplier(mappedMultiplier.toFixed(2) + "x");
  };

  // car container

  return (
    <div className="slider-wrapper">
      <div className="lines-container">
        <img src={icon.line} alt="lines" />
      </div>
      <div className="current-value-progress">
        <span className="multi-img">
          <img src={icon.groupA} alt="groupA" />
          {/* <img src={icon.redIcon} alt="redIcon" />
          <img src={icon.greenIcon} alt="greenIcon" /> */}
        </span>
        {/* <p className="xvalue">
          {matchMaxMultiplier
            ? `${matchMaxMultiplier.toFixed(2)}x`
            : parseFloat(autoMultiplier).toFixed(2) + "x"}
        </p> */}

        <p className="xvalue">{parseFloat(autoMultiplier).toFixed(2)}x</p>

      </div>
      <div style={{ width: "100%" }}>
        <div className="slider-scale">
          <span>1</span>
          <span>25</span>
          <span>50</span>
          <span>75</span>
          <span>100</span>
        </div>
        <div className="tringle-container">
          <div className="triangle-up"></div>
          <div className="triangle-up1"></div>
          <div className="triangle-up2"></div>
          <div className="triangle-up3"></div>
          <div className="triangle-up4"></div>
        </div>
        <div
          className="slider-container"
          style={{ border: ".5rem solid #fff", borderRadius: ".5rem" }}
        >
          <div
            style={{
              border: ".2rem solid black",
              borderRadius: "3px",
              position: "relative",
            }}
          >
            {/* Slider Track */}
            <div
              className="slider-track"
              style={{
                background: `linear-gradient(to right, red ${sliderValue}%, #4ace4a ${sliderValue}%)`,
                height: "12px",
                position: "relative",
              }}
            >
              <LinerAnimation
                sliderValue1={sliderValue1}
                sliderValue={sliderValue}
                isBetting={isBetting}
              />
              <input
                type="range"
                min="1"
                max="100"
                value={sliderValue}
                onChange={handleSliderChange}
                className="slider"
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: "100%",
                  background: "transparent",
                }}
              />
            </div>

            {/* Slider Thumb */}
            <img
              src={isActive ? icon.scrollBar : icon.misc}
              alt="Slider Thumb"
              className="slider-thumb"
              style={{
                position: "absolute",
                top: "-6px",
                left: `calc(${sliderValue}% - 10px)`,
                width: "30px",
                height: "24px",
                pointerEvents: "none",
              }}
            />
          </div>
        </div>
        <div
          className="value-display"
          style={{
            left: `calc(${sliderValue}% - 170px)`,
            marginTop: "2px",
          }}
        >
          <div className="">
            {sliderValue <= 2
              ? "2(MIN)"
              : sliderValue >= 98
              ? "98(MAX)"
              : `${sliderValue}`}
          </div>
        </div>
      </div>
      <div className="plus-section">
        <h1>ADD LINE</h1>
        <img alt="" src={icon.misc7} />
      </div>
    </div>
  );
};

export default MultiplierProgress;
