import React, { useState, useEffect, useContext } from "react";
import { formatBalance } from "../utility/helper";

const BalanceWinAmount = ({
  info,
  resultData,
  isBetting,
  statusData,
  showBalance,
}) => {
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
          <div>
            <p
              className=""
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
