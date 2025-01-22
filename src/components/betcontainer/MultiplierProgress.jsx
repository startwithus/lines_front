import React, { useState } from "react";
import io from "socket.io-client";
import { getMaxMult } from "../../utility/helper";
import { icon } from "../../utility/icon";

const MultiplierProgress = ({
  sliders,
  setSliders,
  resultData,
  totalMultiplier,
  setTotalMultiplier,
  isBetting,
  firstResult,
  secondResult,
  thirdResult,
  iconSrc,
  isRefrece,
}) => {
  const [isActive, setIsActive] = useState(false);

  const handleMouseDown = () => setIsActive(true);
  const handleMouseUp = () => setIsActive(false);

  const handleSliderChange = (index, e) => {
    const value = Math.max(2, Math.min(98, parseInt(e.target.value, 10))); // Clamp value between 2 and 98
    const updatedSliders = [...sliders];
    updatedSliders[index] = value;

    const newTotalMultiplier = getMaxMult(updatedSliders);

    setSliders(updatedSliders);
    setTotalMultiplier(newTotalMultiplier);
  };

  const handleAddSlider = () => {
    if (sliders.length < 3) {
      const updatedSliders = [...sliders, 50];
      const newTotalMultiplier = getMaxMult(updatedSliders);

      setSliders(updatedSliders);
      setTotalMultiplier(newTotalMultiplier);
    }
  };

  const handleRemoveSlider = (index) => {
    const updatedSliders = sliders.filter((_, i) => i !== index);
    const newTotalMultiplier = getMaxMult(updatedSliders);
    setSliders(updatedSliders);
    setTotalMultiplier(newTotalMultiplier);
  };
  console.log("isBetting:", isBetting);

  const renderSlider = (value, index) => {
    let resultWidth = "0";
    if (index === 0) {
      resultWidth = `${firstResult}%`;
    } else if (index === 1 && secondResult) {
      resultWidth = `${secondResult}%`;
    } else if (index === 2 && thirdResult) {
      resultWidth = `${thirdResult}%`;
    }

    return (
      <div className="lines-section" key={index}>
        {index === 0 && (
          <div
            className="current-value-progress"
            style={{
              left: `calc(${value}% - ${value > 50 ? "100px" : "25px"})`,
            }}
          >
            <span className="multi-img">
              <img src={iconSrc} alt="Group Icon" />
            </span>
            <p className="xvalue">{totalMultiplier.toFixed(2)}x</p>
          </div>
        )}
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
        <div className="white-border">
          <div className="black-border">
            <div
              className="slider-track"
              style={{
                background: `linear-gradient(to right, red ${value}%, #4ace4a ${value}%)`,
              }}
            >
              {isRefrece && (
                <div
                  className={`white-bg ${isRefrece ? "white-bg" : ""}`}
                  style={{
                    width: resultWidth,
                    transition: "width 0.3s ease",
                  }}
                ></div>
              )}

              <input
                type="range"
                min="2"
                max="98"
                value={value}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onChange={(e) => handleSliderChange(index, e)}
                className="slider"
              />
            </div>

            <img
              src={isActive ? icon.scrollBar : icon.misc}
              alt="Slider Thumb"
              className="slider-thumb"
              style={{
                left: `calc(${value}% - 10px)`,
              }}
            />
            <>
              {isRefrece && (
                <div
                  className="white-value-no"
                  style={{
                    left: `calc(${resultWidth} - 6px)`,
                    transition: "left 0.3s ease-out, transform 0.3s ease-out",
                  }}
                >
                  {resultWidth.replace("%", "")}
                </div>
              )}
            </>
          </div>
        </div>
        <div className="">
          {}
          {index === 1 && sliders.length === 2 && !isBetting && (
            <img
              src={icon.crossIcon}
              alt="Remove Slider"
              onClick={() => handleRemoveSlider(1)} // Handle removal for the second slider
              style={{
                position: "absolute",
                top: "370px", // Adjust the position vertically
                left: "530px", // Position the icon on the left side of the second slider
                cursor: "pointer",

                height: "40px",
              }}
            />
          )}

          {index === 2 && sliders.length > 2 && !isBetting && (
            <img
              src={icon.crossIcon}
              alt="Remove Slider"
              onClick={() => handleRemoveSlider(2)} // Handle removal for the third slider
              style={{
                position: "absolute",
                top: "478px", // Adjust the position vertically
                left: "530px", // Position the icon on the left side of the third slider
                cursor: "pointer",
                width: "40px",
                height: "40px",
              }}
            />
          )}
        </div>

        <div
          className="value-display"
          style={{
            left: `calc(${value}% - 170px)`,
          }}
        >
          <div className="">
            {value <= 2 ? "2(MIN)" : value >= 98 ? "98(MAX)" : `${value}`}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="slider-wrapper">
        <div className="lines-container">
          <img src={icon.line} alt="Lines" />
        </div>
        <div>{sliders.map((slider, index) => renderSlider(slider, index))}</div>
      </div>
      {sliders.length < 3 &&
        !isBetting && ( // Only show this section if not betting
          <div className="plus-section" onClick={handleAddSlider}>
            <h1>ADD LINE</h1>
            <img src={icon.misc7} alt="Add Line" />
          </div>
        )}
    </>
  );
};

export default MultiplierProgress;
