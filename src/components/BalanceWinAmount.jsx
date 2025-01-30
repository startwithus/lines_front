import React, { useState, useEffect, useContext } from "react";
import { formatBalance } from "../utility/helper";

const BalanceWinAmount = ({ info, resultData, statusData }) => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (statusData === true) {
      setShowPopup(true);

      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      setShowPopup(false);
    }
  }, [statusData]);

  return (
    <div style={{ height: "" }}>
      {showPopup && (
        <div className="win-amount-section">
          Win Amount: {resultData?.winAmount}
        </div>
      )}

      <div className="blance-info-container">
        <div className="balance-info">
          <div className="">
            <p
              className=""
              style={{
                fontSize: "10px",
                color: "#e9ecef",
                textAlign: "center",
                height: "10px",
              }}
            >
              BALANCE:
            </p>
            <p
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#fff",
                marginTop: "6px",
              }}
            >
              {`${formatBalance(info.balance)}`}
            </p>
          </div>
        </div>
        <div className="balance-info">
          <div>
            <p
              style={{
                fontSize: "10px",
                color: "#e9ecef",
                textAlign: "center",
                height: "10px",
              }}
            >
              WIN
            </p>
            <p
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#fff",
                marginTop: "6px",
                height: "10px",
              }}
            >
              {resultData?.winAmount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceWinAmount;
