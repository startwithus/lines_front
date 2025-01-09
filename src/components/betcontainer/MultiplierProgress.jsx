import React, { useState } from "react";

const MultiplierProgress = () => {
  const [value, setValue] = useState(42);
  const [number, setNumber] = useState();
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
        <p>LINES</p>
      </div>
      <div
        className="value-display"
        // style={{
        //   left: `calc(${value}% - ${value > 50 ? "100px" : "25px"})`,
        // }}
      >
        <div className="value-button">{(value / 100).toFixed(2)}x</div>
      </div>
      <div
        className="slider-scale"
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "1rem",
          color: "#fff",
          fontSize: "14px",
          fontWeight: 800,
        }}
      >
        <span>1</span>
        <span>25</span>
        <span>50</span>
        <span>75</span>
        <span>100</span>
      </div>
      <div
        className=""
        style={{ border: ".5rem solid #fff", borderRadius: ".5rem" }}
      >
        <div style={{ border: ".2rem solid black ", borderRadius: "3px" }}>
          <div
            className="slider-track"
            style={{
              background: `linear-gradient(to right, red ${value}%, #4ace4a ${value}%)`,
            }}
          >
            <div className="slider-progress"></div>
            <input
              type="range"
              min="1"
              max="100"
              value={value}
              onChange={handleChange}
              className="slider"
            />
          </div>
        </div>
      </div>
      <div
        className="value-display"
        style={{
          position: "relative",
          color: "#fff",
          fontSize: "12px",
          fontWeight: 800,
          marginTop: ".3rem",
          left: `calc(${number}% - 235px)`,
        }}
      >
        <div className="">
          {number === 2 ? "2(min)" : number === 98 ? "98(max)" : `${number}`}
        </div>
      </div>
    </div>
  );
};

export default MultiplierProgress;
