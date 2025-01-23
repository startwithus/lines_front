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
  isbno,
  statusData,
  isZoomOut,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [activeSliderIndex, setActiveSliderIndex] = useState(null);
  const [triggerBounce, setTriggerBounce] = useState(false);

  const handleMouseDown = (index) => {
    setActiveSliderIndex(index);
  };

  const handleMouseUp = () => {
    setActiveSliderIndex(null);
  };

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

  const renderSlider = (value, index) => {
    const isActive = activeSliderIndex === index;

    let resultWidth = "0";
    if (index === 0) {
      resultWidth = `${firstResult}%`;
    } else if (index === 1 && secondResult) {
      resultWidth = `${secondResult}%`;
    } else if (index === 2 && thirdResult) {
      resultWidth = `${thirdResult}%`;
    }

    return (
      <div className="" style={{ position: "sticky" }}>
        <div className="lines-section" key={index}>
          {index === 0 && (
            <div
              className="current-value-progress"
              style={{
                left: `calc(${value}% - ${value > 50 ? "100px" : "25px"})`,
              }}
            >
              <span className="multi-img">
                <img
                  src={iconSrc}
                  alt=""
                  className={isZoomOut ? "zoom-in-out-element" : ""}
                />
                {/* <img
                  src={
                    totalMultiplier < 1.05 || totalMultiplier > 5000.0
                      ? icon.group2
                      : icon.groupA
                  }
                  alt="Icon"
                  className={isZoomOut ? "zoom-in-out-element" : ""}
                /> */}
              </span>
              <p className={`xvalue ${triggerBounce ? "bounce" : ""}`}>
                {totalMultiplier.toFixed(2)}x
              </p>
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
                    className="white-bg"
                    style={{
                      width: resultWidth,
                      transition: "width 0.5s linear",
                    }}
                  ></div>
                )}
                <input
                  type="range"
                  min="2"
                  max="98"
                  value={value}
                  onMouseDown={() => handleMouseDown(index)}
                  onMouseUp={handleMouseUp}
                  onChange={(e) => handleSliderChange(index, e)}
                  // className="slider"
                  className={`slider ${isActive ? "active" : ""}`} // Add "active" if isActive is true
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
                {isbno && (
                  <div
                    className="white-value-no"
                    style={{
                      left: `calc(${resultWidth} - 6px)`,
                      transition: "left 0.3s ease-out",
                    }}
                  >
                    {resultWidth.replace("%", "")}
                  </div>
                )}
              </>
            </div>
          </div>

          <div className="" style={{ position: "relative" }}>
            {index === 1 && sliders.length === 2 && !isBetting && (
              <img
                className="cross-first"
                src={icon.crossIcon}
                alt="Remove Slider"
                onClick={() => handleRemoveSlider(1)}
              />
            )}

            {index === 2 && sliders.length > 2 && !isBetting && (
              <img
                className="cross-second"
                src={icon.crossIcon}
                alt="Remove Slider"
                onClick={() => handleRemoveSlider(2)}
              />
            )}
          </div>

          <div
            className="value-display"
            style={{
              left: `calc(${value}% - 0px)`,
            }}
          >
            <div className="value-sticky">
              {value <= 2 ? "2(MIN)" : value >= 98 ? "98(MAX)" : `${value}`}
            </div>
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
            <div>
              <div>
                <h1>ADD LINE</h1>
              </div>
              <div>
                <img src={icon.misc7} alt="Add Line" />
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export default MultiplierProgress;
