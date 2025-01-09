import React from "react";

const BalanceWinAmount = ({ info }) => {
  return (
    <div className="blance-info-container">
      <div className="balance-info">
        <div>
          <p style={{ fontSize: "11px", Color: "#e9ecef" }}>Blance:</p>

          <p style={{ fontSize: "16px", fontWeight: 700, color: "fff" }}>
            {info.balance}
          </p>
        </div>
      </div>
      <div className="balance-info">
        <div>
          <p style={{ fontSize: "11px", Color: "#e9ecef" }}>Win</p>

          <p style={{ fontSize: "16px", fontWeight: 700, color: "fff" }}>45x</p>
        </div>
      </div>
    </div>
  );
};

export default BalanceWinAmount;
