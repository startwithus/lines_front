import React, { useEffect, useState } from "react";
import { icon } from "../../utility/icon";

const MultiplierProgress = ({
  setAutoMultiplier,
  autoMultiplier,
  autoValue,
  socketData,
  currentMax,
  resultData
}) => {
  console.log(resultData,"hiiiiii")
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

    // Map slider value to a multiplier range
    let mappedMultiplier;
    if (newValue < 1.1) {
      mappedMultiplier = newValue + 0.01;
    } else if (newValue < 2.0) {
      mappedMultiplier = newValue + 0.1;
    } else if (newValue < 10) {
      mappedMultiplier = newValue + 1.0;
    } else if (newValue < 100) {
      mappedMultiplier = newValue + 10.0;
    } else {
      mappedMultiplier = Math.min(newValue + 100.0, 1000.0);
    }

    setAutoMultiplier(mappedMultiplier.toFixed(2) + "x");
  };

  // Listen for changes in socket data
  useEffect(() => {
    if (resultData?.match_max_mult) {
      setMatchMaxMultiplier(resultData.match_max_mult);
    }
  }, [resultData]);

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
              {/* Moving Point */}
              <div
                className="white-bg"
                style={{
                  position: "absolute",
                  top: "-4px",
                  background: "#fff",
                  width: `${resultData}%`,
                  height: "20px",
                  transition: "width 0.3s ease",
                }}
              ></div>

              {/* Input Slider */}
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
          <div>
            {sliderValue <= 3
              ? "2(MIN)"
              : sliderValue >= 97
                ? "98(MAX)"
                : `${sliderValue}`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiplierProgress;
