import React from "react";

const BalanceWinAmount = ({ info, resultData, isBetting }) => {
  return (
    <div style={{ height: "" }}>
      <div className="blance-info-container">
        <div className="balance-info">
          <div>
            <p
              className=""
              style={{
                fontSize: "10px",
                Color: "#e9ecef",
                textAlign: "center",
              }}
            >
              BALANCE:
            </p>

            <p
              style={{
                fontSize: "16px",
                fontWeight: 700,
                color: "fff",
                marginTop: "6px",
              }}
            >
              {info.balance}
            </p>
          </div>
        </div>
        <div className="balance-info">
          <div className="">
            <div>
              <p
                style={{
                  fontSize: "10px",
                  Color: "#e9ecef",
                  textAlign: "center",
                }}
              >
                WIN
              </p>
            </div>
            <div className="">
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "fff",
                  marginTop: "6px",
                }}
              >
                {resultData?.winAmount}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceWinAmount;
