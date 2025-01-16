import React, { useEffect, useRef, useState } from "react";
import { icon } from "../../utility/icon";
import LineInputSecond from "./LineInputSecond";
import ThirdLinerInput from "./ThirdLinerInput";

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
  const [sliderValue, setSliderValue] = useState(11);
  const [isActive, setIsActive] = useState(false);
  const [iconToDisplay, setIconToDisplay] = useState(icon.groupA);
  const handleMouseDown = () => setIsActive(true);
  const handleMouseUp = () => setIsActive(false);

  // Change the image based on the condition of sliderValue1 and autoMultiplier
  useEffect(() => {
    if (isBetting) {
      setIconToDisplay(icon.groupA); // Reset to groupA when betting starts
    } else {
      if (sliderValue1 > parseFloat(autoMultiplier)) {
        setIconToDisplay(icon.group3); // Show group3 if sliderValue1 > autoMultiplier
      } else if (sliderValue1 < parseFloat(autoMultiplier)) {
        setIconToDisplay(icon.group2); // Show group2 if sliderValue1 < autoMultiplier
      } else {
        setIconToDisplay(icon.groupA); // Default to groupA if they are equal
      }
    }
  }, [sliderValue1, autoMultiplier, isBetting]);
  const handleSliderChange = (e) => {
    const newValue = parseFloat(e.target.value);
    setSliderValue(newValue);

    let mappedMultiplier;
    if (newValue <= 2) {
      mappedMultiplier = 0.93 + (newValue - 1) * 0.01;
    } else if (newValue <= 10) {
      mappedMultiplier = 1.1 + (newValue - 2) * 0.03;
    } else if (newValue <= 50) {
      mappedMultiplier = 2.0 + (newValue - 10) * 0.07;
    } else if (newValue <= 100) {
      mappedMultiplier = 5.0 + (newValue - 50) * 0.76;
    } else if (newValue > 100) {
      mappedMultiplier = 1000.0 + (newValue - 100) * 100;
    }

    // Cap the value at 1000.00
    if (mappedMultiplier > 1000) {
      mappedMultiplier = 1000.0;
    }

    setAutoMultiplier(mappedMultiplier.toFixed(2) + "x");
  };

  const isWinning = sliderValue1 > parseFloat(autoMultiplier);

  return (
    <div className="slider-wrapper">
      <div className="lines-container">
        <img src={icon.line} alt="" />
      </div>
      <div className="current-value-progress">
        <span className="multi-img">
          {/* Show the image based on the comparison */}
          <img src={iconToDisplay} alt="" />
        </span>
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
          className=""
          style={{ border: ".5rem solid #fff", borderRadius: ".5rem" }}
        >
          <div
            style={{
              border: ".2rem solid black",
              borderRadius: "3px",
              position: "relative",
            }}
          >
            <div
              className="slider-track"
              style={{
                background: `linear-gradient(to right, red ${sliderValue}%, #4ace4a ${sliderValue}%)`,
                height: "12px",
              }}
            >
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
              {/* <LinerAnimation
                sliderValue1={sliderValue1}
                sliderValue={sliderValue}
                isBetting={isBetting}
              /> */}
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
                  background: "transparent",
                }}
              />
            </div>

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
      <LineInputSecond />
      <ThirdLinerInput />
      <div className="plus-section">
        <h1>ADD LINE</h1>
        <img alt="" src={icon.misc7} />
      </div>
    </div>
  );
};

export default MultiplierProgress;
