import React, { useState } from "react";
import io from "socket.io-client";
import { getMaxMult } from "../../utility/helper";




const MultiplierProgress = ({ setSliders, setTotalMultiplier, sliders, totalMultiplier }) => {

  const handleSliderChange = (index, e) => {
    const value = Math.max(2, Math.min(98, parseInt(e.target.value, 10))); // Clamp value between 2 and 98
    const updatedSliders = [...sliders];
    updatedSliders[index] = value;

    // Calculate total multiplier based on all slider values
    const newTotalMultiplier = getMaxMult(updatedSliders);

    setSliders(updatedSliders);
    setTotalMultiplier(newTotalMultiplier);
  };

  const handleAddSlider = () => {
    if (sliders.length < 3) {
      const updatedSliders = [...sliders, 2]; // Add a new slider with a default value
      const newTotalMultiplier = getMaxMult(updatedSliders);

      setSliders(updatedSliders);
      setTotalMultiplier(newTotalMultiplier);
    }
  };

  const handleRemoveSlider = () => {
    const updatedSliders = sliders.slice(0, sliders.length - 1); // Remove the last slider
    const newTotalMultiplier = getMaxMult(updatedSliders);

    setSliders(updatedSliders);
    setTotalMultiplier(newTotalMultiplier);
  }



  return (
    <div className="slider-wrapper">
      {sliders.map((value, index) => (
        <div key={index} className="slider-container">
          <input
            type="range"
            min="2"
            max="98"
            value={value}
            onChange={(e) => handleSliderChange(index, e)}
          />
          <div className="value-display">Value: {value}</div>
        </div>
      ))}

      <div className="total-multiplier">
        <strong>Total Multiplier:</strong> {totalMultiplier}
      </div>

      {sliders.length < 3 && (
        <button onClick={handleAddSlider}>Add Slider</button>
      )}

      {/* Only show one remove button */}
      {sliders.length > 1 && (
        <button onClick={handleRemoveSlider}>Remove Last Slider</button>
      )}

      {/* Place Bet Button */}

    </div>
  );
};

export default MultiplierProgress;
