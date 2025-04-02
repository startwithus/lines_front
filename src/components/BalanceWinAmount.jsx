import React, { useState, useEffect, useContext } from "react";
import { formatBalance } from "../utility/helper";

const BalanceWinAmount = ({ info, resultData, statusData, winAmount1 }) => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (statusData && resultData?.winAmount) {
      const delayTimer = setTimeout(() => {
        setShowPopup(true);

        const hideTimer = setTimeout(() => {
          setShowPopup(false);
        }, 2000);

        return () => clearTimeout(hideTimer);
      }, 500); // Delay pop-up and win amount by 2 seconds

      return () => clearTimeout(delayTimer);
    } else {
      setShowPopup(false);
    }
  }, [statusData, resultData]);

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
              {winAmount1}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceWinAmount;
