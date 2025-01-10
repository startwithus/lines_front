import React, { useState } from "react";
import { icon } from "../../utility/icon";

const MultiplierProgress = () => {
  const [value, setValue] = useState(50);
  const [number, setNumber] = useState(50);
  const [isActive, setIsActive] = useState(false);
  const handleMouseDown = () => setIsActive(true);
  const handleMouseUp = () => setIsActive(false);
  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    // Map value to range between 2 and 98
    const newNumber = Math.max(2, Math.min(98, newValue));
    setNumber(newNumber);
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
        <p className="xvalue">{(value / 100).toFixed(2)}x</p>
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
                background: `linear-gradient(to right, red ${value}%, #4ace4a ${value}%)`,
                height: "12px",
              }}
            >
              <input
                type="range"
                min="1"
                max="100"
                value={value}
                onChange={handleChange}
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
              <img
                src={isActive ? icon.scrollBar : icon.misc}
                alt="Slider Thumb"
                className="slider-thumb"
                style={{
                  position: "absolute",
                  top: "-4px",
                  left: `calc(${value}% - 10px)`,
                  width: "30px",
                  height: "24px",
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>
        </div>
        <div
          className="value-display"
          style={{
            left: `calc(${number}% - 170px)`,
            marginTop: "2px",
          }}
        >
          <div className="">
            {number === 2 ? "2(min)" : number === 98 ? "98(max)" : `${number}`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiplierProgress;