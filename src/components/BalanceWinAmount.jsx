import React from "react";

const BalanceWinAmount = ({ info, cashoutData }) => {
  return (
    <div style={{ height: "" }}>
      <div className="blance-info-container">
        <div className="balance-info">
          <div>
            <p
              style={{
                fontSize: "11px",
                Color: "#e9ecef",
                textAlign: "center",
              }}
            >
              Balance:
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
                  fontSize: "11px",
                  Color: "#e9ecef",
                  textAlign: "center",
                }}
              >
                Win
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
                {cashoutData?.length > 0
                  ? cashoutData?.map((el, i) => (
                      <div className={`win-amount`} key={i}>
                        {el?.winAmount}
                      </div>
                    ))
                  : null}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceWinAmount;
