import React, { useState } from "react";
import { icon } from "../../utility/icon";

const MultiplierProgress = ({ setResultData, autoMultiplier, setAutoMultiplier }) => {
  const [sliders, setSliders] = useState([{ value: 50, isActive: false }]); // Initial slider with default value

  const handleAddLine = () => {
    if (sliders.length < 3) {
      setSliders([...sliders, { value: 50, isActive: false }]);
    }
  };

  const handleRemoveLine = (index) => {
    setSliders(sliders.filter((_, idx) => idx !== index));
  };

  const handleMouseDown = (index) => {
    setSliders((prev) =>
      prev.map((slider, idx) =>
        idx === index ? { ...slider, isActive: true } : slider
      )
    );
  };

  const handleMouseUp = (index) => {
    setSliders((prev) =>
      prev.map((slider, idx) =>
        idx === index ? { ...slider, isActive: false } : slider
      )
    );
  };

  const handleChange = (e, index) => {
    const newValue = parseInt(e.target.value, 10);
    setSliders((prev) =>
      prev.map((slider, idx) =>
        idx === index
          ? { ...slider, value: Math.max(2, Math.min(98, newValue)) }
          : slider
      )
    );
  };

  const renderSlider = (slider, index) => {
    const value = slider.value || 50;
    const isActive = slider.isActive || false;

    return (
      <div className="lines-section" key={index}>
        {index === 0 && (
          <div
            className="current-value-progress"
            style={{
              left: `calc(${value}% - ${value > 50 ? "100px" : "25px"})`,
              top: "-30px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span className="multi-img">
              <img
                src={icon.groupA}
                alt="Group Icon"
                style={{ width: "150px", height: "50px", textAlign: "center" }}
              />
            </span>
            <p className="xvalue">{(value / 10).toFixed(2)}x</p>
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
        <div style={{ border: ".5rem solid #fff", borderRadius: ".5rem" }}>
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
              <input
                type="range"
                min="1"
                max="100"
                value={value}
                onChange={(e) => handleChange(e, index)}
                className="slider"
                onMouseDown={() => handleMouseDown(index)}
                onMouseUp={() => handleMouseUp(index)}
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
                top: "-4px",
                left: `calc(${value}% - 10px)`,
                width: "30px",
                height: "24px",
                pointerEvents: "none",
              }}
            />
          </div>
        </div>
        {index !== 0 && (
          <img
            src={icon.crossIcon}
            alt="Remove Slider"
            onClick={() => handleRemoveLine(index)}
            style={{
              position: "absolute",
              top: "-10px",
              left: "-40px",
              cursor: "pointer",
              width: "40px",
              height: "40px",
            }}
          />
        )}
      </div>
    );
  };

  return (
    <div className="slider-wrapper">
      <div className="lines-container">
        <img src={icon.line} alt="" />
      </div>
      <div>{sliders.map((slider, index) => renderSlider(slider, index))}</div>
      {sliders.length < 3 && (
        <div className="plus-section" onClick={handleAddLine}>
          <h1>ADD LINE</h1>
          <img src={icon.plusIcon} alt="Add Line" />
        </div>
      )}
    </div>
  );
};

export default MultiplierProgress;
