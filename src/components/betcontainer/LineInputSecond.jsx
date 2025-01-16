import React from "react";
import { icon } from "../../utility/icon";

const LineInputSecond = ({
  sliderValue1,
  sliderValue,
  autoMultiplier,
  handleSliderChange,
  handleMouseUp,
  handleMouseDown,
  isActive,
}) => {
  return (
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
  );
};

export default LineInputSecond;
