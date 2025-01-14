import React, { useEffect, useRef, useState } from "react";
import { icon } from "../../utility/icon";
import LinerAnimation from "./LinerAnimation";

const MultiplierProgress = ({
  setAutoMultiplier,
  autoMultiplier,
  autoValue,
  resultData,
  // currentMax,
}) => {
  // const [value, setValue] = useState(50);
  // const [number, setNumber] = useState(50);
  const [sliderValue, setSliderValue] = useState(50); // Value of the slider
  const [isActive, setIsActive] = useState(false);
  const handleMouseDown = () => setIsActive(true);
  const handleMouseUp = () => setIsActive(false);
  // const refCurrent = useRef(Number(resultData.winningMultiplier));
  // const [newCoefficient, setNewCoefficient] = useState(
  //   resultData.winningMultiplier
  // );
  const handleSliderChange = (e) => {
    const newValue = parseFloat(e.target.value); // Get the current slider value
    setSliderValue(newValue); // Update the slider value state

    let mappedMultiplier; // Variable to store the mapped multiplier value

    // Map slider value to a multiplier range
    if (newValue < 1.1) {
      mappedMultiplier = newValue + 0.01; // Increment by 0.01 when below 1.10
    } else if (newValue < 2.0) {
      mappedMultiplier = newValue + 0.1; // Increment by 0.10 when between 1.10 and 2.00
    } else if (newValue >= 2.0 && newValue < 10) {
      mappedMultiplier = newValue + 1.0; // Increment by 1.00 when between 2.00 and 10
    } else if (newValue >= 10 && newValue < 100) {
      mappedMultiplier = newValue + 10.0; // Increment by 10.00 when between 10 and 100
    } else if (newValue >= 100 && newValue < 1000) {
      mappedMultiplier = newValue + 100.0; // Increment by 100.00 when between 100 and 1000
    }

    // Cap the value at 1000.00
    if (mappedMultiplier > 1000) {
      mappedMultiplier = 1000.0;
    }

    // Set the updated multiplier value with a fixed precision of 2 decimal places
    setAutoMultiplier(mappedMultiplier.toFixed(2) + "x");
  };

  return (
    <div className="slider-wrapper">
      <div className="lines-container">
        <img src={icon.line} alt="" />
      </div>
      <div
        className="current-value-progress"
        // style={{
        //   left: `calc(${value}% - ${value > 50 ? "100px" : "25px"})`,
        // }}
      >
        <span className="multi-img">
          <img src={icon.groupA} alt="" />
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
              <LinerAnimation sliderValue={sliderValue} />
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
            {sliderValue <= 3
              ? "2(MIN)"
              : sliderValue >= 97
              ? "98(MAX)"
              : `${sliderValue}`}
          </div>
        </div>
      </div>
      {/* <div className="add-liner">
        <img src={icon.misc7} alt="" />
      </div> */}
    </div>
  );
  return (
    <div className="slider-wrapper">
      <div className="lines-container">
        <img src={icon.line} alt="" />
      </div>
      <div className="">
        {/* {sliders.map((slider, index) => renderSlider(slider, index))}
        {sliders.length < 3 && ( */}
        <div className="plus-section">
          <h1>ADD LINE</h1>
          <img src={icon.misc7} alt="Add Line" />
        </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default MultiplierProgress;
