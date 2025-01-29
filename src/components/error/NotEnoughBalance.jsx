import React, { useEffect } from "react";
import "./error.css";

const NotEnoughBalance = ({ setShowBalance, showBalance, amount }) => {
  useEffect(() => {
    let timer;
    if (showBalance) {
      timer = setTimeout(() => {
        setShowBalance(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [showBalance, setShowBalance]);
  return (
    <div className="error-modal">
      <div className="modal-content-error">
        <p className="session-para">
          {+amount === 0 ? "Can't set bet amount 0" : "Not Enough Balance"}
        </p>

        <button
          onClick={() => setShowBalance(false)}
          type="button"
          aria-label="Close"
          className="icon-close"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
    </div>
  );
};

export default NotEnoughBalance;
