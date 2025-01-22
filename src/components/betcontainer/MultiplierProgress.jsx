import React, { useState } from "react";
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
  const [showThirdSlider, setShowThirdSlider] = useState(false);

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

  const handleThumbClick = () => {
    setIsActive(!isActive);
  };

  const handleAddSlider = () => {
    if (sliders.length < 3) {
      const updatedSliders = [...sliders, 50];
      const newTotalMultiplier = getMaxMult(updatedSliders);

      setSliders(updatedSliders);
      setTotalMultiplier(newTotalMultiplier);
      setShowThirdSlider(true); // Set to true when third slider is added
    }
  };

  const handleRemoveSlider = (index) => {
    if (index === 2) {
      const updatedSliders = sliders.filter((_, i) => i !== index); // Remove the slider at the specified index
      const newTotalMultiplier = getMaxMult(updatedSliders);

      setSliders(updatedSliders);
      setTotalMultiplier(newTotalMultiplier);
      setShowThirdSlider(false); // Set to false when third slider is removed
    } else {
      const updatedSliders = sliders.filter((_, i) => i !== index);
      const newTotalMultiplier = getMaxMult(updatedSliders);

      setSliders(updatedSliders);
      setTotalMultiplier(newTotalMultiplier);
    }
  };

  const renderSlider = (value, index) => {
    let resultWidth = "0"; // Default width for all sliders
    if (index === 0) {
      resultWidth = `${firstResult}%`; // First slider: use firstResult
    } else if (index === 1 && secondResult) {
      resultWidth = `${secondResult}%`; // Second slider: use secondResult
    } else if (index === 2 && thirdResult) {
      resultWidth = `${thirdResult}%`; // Third slider: use thirdResult
    }

    return (
      <div className="lines-section" key={index}>
        {/* Current Value Progress */}
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
                alt="Group Icon"
                style={{ width: "px", height: "50px", textAlign: "center" }}
              />
            </span>
            <p className="xvalue">{totalMultiplier.toFixed(2)}</p>
          </div>
        )}
        {/* Slider Scale */}
        <div className="" style={{ marginTop: "1rem" }}>
          <div className="slider-scale">
            <span>1</span>
            <span>25</span>
            <span>50</span>
            <span>75</span>
            <span>100</span>
          </div>

          {/* Triangle Decorations */}
          <div className="tringle-container">
            <div className="triangle-up"></div>
            <div className="triangle-up1"></div>
            <div className="triangle-up2"></div>
            <div className="triangle-up3"></div>
            <div className="triangle-up4"></div>
          </div>

          {/* Slider Background */}
          <div style={{ border: ".4rem solid #fff", borderRadius: ".5rem" }}>
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
                  height: "13px",
                }}
              >
                <>
                  <div
                    className="white-bg"
                    style={{
                      position: "absolute",
                      top: "-4px",
                      background: "#fff",
                      width: resultWidth,
                      height: "20px",
                      transition: "width 0.6s ease-out",
                    }}
                  ></div>

                  <div
                    style={{
                      position: "absolute",
                      top: "45%",
                      left: `calc(${resultWidth} - 5px)`,
                      transform: "translateY(-50%)",
                      fontSize: "16px",
                      fontWeight: "900",
                      color: "#000",
                      borderRadius: "4px",
                      whiteSpace: "nowrap",
                      transition: "left 0.6s ease-out",
                    }}
                  >
                    {resultWidth.replace("%", "")}
                  </div>
                </>


                {/* Slider Range Input */}
                <input
                  type="range"
                  min="2"
                  max="98"
                  value={value}
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                  onChange={(e) => handleSliderChange(index, e)}
                  className="slider"
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
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
                  top: "-5px",
                  left: `calc(${value}% - 10px)`,
                  width: "24px",
                  height: "24px",
                  pointerEvents: "none",
                }}
                onClick={handleThumbClick}
              />
            </div>
          </div>
          <div className="">
            {/* Show Cross Icon for second slider only if the third slider is not present */}
            {index === 1 && sliders.length === 2 && !isBetting && (
              <img
                src={icon.crossIcon}
                alt="Remove Slider"
                onClick={() => handleRemoveSlider(1)} // Handle removal for the second slider
                style={{
                  position: "absolute",
                  top: "270px", // Adjust the position vertically
                  left: "-45px", // Position the icon on the left side of the second slider
                  cursor: "pointer",
                  width: "40px",
                  height: "40px",
                }}
              />
            )}

            {/* Show Cross Icon for third slider */}
            {index === 2 && sliders.length > 2 && !isBetting && (
              <img
                src={icon.crossIcon}
                alt="Remove Slider"
                onClick={() => handleRemoveSlider(2)} // Handle removal for the third slider
                style={{
                  position: "absolute",
                  top: "378px", // Adjust the position vertically
                  left: "-45px", // Position the icon on the left side of the third slider
                  cursor: "pointer",
                  width: "40px",
                  height: "40px",
                }}
              />
            )}
          </div>

          {/* Value Display */}
          <div
            className="value-display"
            style={{
              left: `calc(${value}% - 170px)`,
              marginTop: "2px",
            }}
          >
            <div className="">
              {value <= 2 ? "2(MIN)" : value >= 98 ? "98(MAX)" : `${value}`}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="slider-wrapper">
      <div className="lines-container">
        <img src={icon.line} alt="Lines" />
      </div>
      <div>{sliders.map((slider, index) => renderSlider(slider, index))}</div>
      {sliders.length < 3 && !isBetting && (
        <div className="plus-section" onClick={handleAddSlider}>
          <h1 className="line-add">ADD LINE</h1>
          <img src={icon.misc7} alt="Add Line" />
        </div>
      )}
    </div>
  );
};

export default MultiplierProgress;
