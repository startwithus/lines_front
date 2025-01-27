import React, { useState, useEffect } from "react";
import { formatBalance } from "../utility/helper";

const BalanceWinAmount = ({ info, resultData, isBetting, statusData, showBalance }) => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    let timer;

    if (statusData || (info.balance && info.balance < 10)) {
      setShowPopup(true);

      // Automatically hide the popup after 2 seconds
      timer = setTimeout(() => {
        setShowPopup(false);
      }, 2000);
    }

    // Cleanup the timer on component unmount or if dependencies change
    return () => clearTimeout(timer);
  }, [statusData, info.balance]);

  return (
    <div style={{ height: "" }}>
      {/* Popup */}
      {showPopup && (
        <div className="win-amount-section">
          {info.balance < 10 ? "Balance is less than 10" : `Win Amount: ${resultData?.winAmount}`}
        </div>
      )}

      {/* Balance and Win Amount Info */}
      <div className="blance-info-container">
        <div className="balance-info">
          <div>
            <p
              style={{
                fontSize: "10px",
                color: "#e9ecef",
                textAlign: "center",
              }}
            >
              BALANCE:
            </p>
            <p
              style={{
                fontSize: "16px",
                fontWeight: 700,
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
              }}
            >
              WIN
            </p>
            <p
              style={{
                fontSize: "16px",
                fontWeight: 700,
                color: "#fff",
                marginTop: "6px",
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
