import React, { useContext, useState } from "react";
import { getMaxMult } from "../../utility/helper";
import { icon } from "../../utility/icon";
import { SoundContext } from "../../context/SoundContext";
import { playClickSound } from "../../utility/gameSettings";
import MenuIcon from "./MenuIcon";

// import { playButtonSound } from '../../utility/gameSettings

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
  setIconSrc,
  statusData,
  setResultData,
  isTurbo,
  autobet,
  queryParams,
  info,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [activeSliderIndex, setActiveSliderIndex] = useState(null);
  const [triggerBounce, setTriggerBounce] = useState(false);
  const { sound } = useContext(SoundContext);

  const handleMouseDown = (index) => {
    setActiveSliderIndex(index);
    setResultData(false);
  };

  const handleMouseUp = () => {
    setActiveSliderIndex(null);
    setResultData(false);
  };

  const handleSliderChange = (index, e) => {
    const value = Math.max(2, Math.min(98, parseInt(e.target.value, 10))); // Clamp value between 2 and 98
    const updatedSliders = [...sliders];
    updatedSliders[index] = value;
    setResultData(false);
    const newTotalMultiplier = getMaxMult(updatedSliders);

    setSliders(updatedSliders);
    setTotalMultiplier(newTotalMultiplier);
  };

  const handleAddSlider = () => {
    if (sound) {
      playClickSound();
    }
    if (sliders.length < 3) {
      const updatedSliders = [...sliders, 50];
      const newTotalMultiplier = getMaxMult(updatedSliders);
      setResultData(false);
      setSliders(updatedSliders);
      setTotalMultiplier(newTotalMultiplier);
    }
  };

  const handleRemoveSlider = (index) => {
    if (sound) {
      playClickSound();
    }
    const updatedSliders = sliders.filter((_, i) => i !== index);
    const newTotalMultiplier = getMaxMult(updatedSliders);
    setSliders(updatedSliders);
    setTotalMultiplier(newTotalMultiplier);
    setResultData(false);
  };

  const renderSlider = (value, index) => {
    const isActive = activeSliderIndex === index;

    // let resultWidth = "0";
    // if (index === 0) {
    //   resultWidth = `${firstResult}%`;
    // } else if (index === 1 && secondResult) {
    //   resultWidth = `${secondResult}%`;
    // } else if (index === 2 && thirdResult) {
    //   resultWidth = `${thirdResult}%`;
    // }
    let resultWidth = "";

    if (index === 0 && firstResult !== undefined && firstResult !== null) {
      resultWidth = `${firstResult}%`;
    } else if (
      index === 1 &&
      secondResult !== undefined &&
      secondResult !== null
    ) {
      resultWidth = `${secondResult}%`;
    } else if (
      index === 2 &&
      thirdResult !== undefined &&
      thirdResult !== null
    ) {
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
                  className={statusData ? "zoom-in-out-border" : ""}
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
              <p
                className={`xvalue ${triggerBounce ? "bounce" : ""}`}
                style={{
                  color:
                    totalMultiplier < 1.05 || totalMultiplier > 5000.0
                      ? "#343a40"
                      : "#fff",
                }}
              >
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
                      transition: isTurbo ? "none" : "width 0.5s linear",
                    }}
                  ></div>
                )}
                <input
                  type="range"
                  min="2"
                  max="98"
                  value={value}
                  onMouseDown={
                    autobet ? undefined : () => handleMouseDown(index)
                  }
                  onMouseUp={autobet ? undefined : handleMouseUp}
                  onChange={
                    autobet ? undefined : (e) => handleSliderChange(index, e)
                  }
                  className={`slider ${isActive ? "active" : ""} ${
                    autobet ? "disabled" : ""
                  }`}
                  style={{
                    cursor: autobet ? "not-allowed" : "pointer",
                  }}
                />
              </div>
              <div className="img-active">
                <img
                  src={isActive ? icon.scrollBar : icon.misc}
                  alt="Slider Thumb"
                  className="slider-thumb"
                  style={{
                    left: `calc(${value}% - 10px)`,
                    cursor: autobet ? "not-allowed" : "pointer",
                  }}
                  onMouseDown={() => !autobet && setIsActive(true)}
                  onMouseUp={() => !autobet && setIsActive(false)}
                  onTouchStart={() => !autobet && setIsActive(true)}
                  onTouchEnd={() => !autobet && setIsActive(false)}
                />
              </div>

              <>
                {isbno && (
                  <div
                    className="white-value-no"
                    style={{
                      left: "48%",
                      transition: "left 0.3s ease-out",
                      textShadow:
                        parseFloat(resultWidth.replace("%", "")) < value
                          ? "-1px -1px 0 red, 1px -1px 0 red, -0px 2px 1px red, 1px 1px 0 red"
                          : "-1px -1px 0 #4ace4a, 1px -1px 0 #4ace4a, -0px 2px 1px #4ace4a, 1px 1px 0 #4ace4a",
                      color: "black", // Text color
                    }}
                  >
                    {resultWidth.replace("%", "").replace(/^0+/, "")}
                  </div>
                )}
              </>
            </div>
          </div>

          <div className="" style={{ position: "relative" }}>
            {index === 1 && sliders.length === 2 && !isBetting && !autobet && (
              <img
                className="cross-first"
                src={icon.crossIcon}
                alt="Remove Slider"
                onClick={() => handleRemoveSlider(1)}
              />
            )}

            {index === 2 && sliders.length > 2 && !isBetting && !autobet && (
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
              left: `calc(${value}% - 5px)`,
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
      <div className="menu-icon">
        <MenuIcon
          queryParams={queryParams}
          info={info}
          totalMultiplier={totalMultiplier}
          resultData={resultData}
        />
      </div>
      <div className="slider-wrapper">
        <div className="lines-container">
          <img src={icon.line} alt="Lines" />
        </div>
        <div>{sliders.map((slider, index) => renderSlider(slider, index))}</div>

        <div className="add-section">
          {sliders.length < 3 &&
            !isBetting &&
            !autobet && ( // Only show this section if not betting
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
        </div>
      </div>
    </>
  );
};

export default MultiplierProgress;
