import React from "react";

const BetDetailModal = ({ bet, onClose }) => {
  return (
    <div className="modal-overlay-bet" onClick={onClose}>
      <div className="modal-content-bet" onClick={(e) => e.stopPropagation()}>
        <div className="history-bet">
          <p style={{ color: "#fff" }}>Bet Details</p>
          <button className="close-btn" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="bet-details">
          <p>
            <strong>Time:</strong> {new Date(bet?.created_at).toLocaleString()}
          </p>
          <p>
            <strong>Bet Amount:</strong>{" "}
            {parseFloat(bet?.bet_amount).toFixed(2)}
          </p>
          <p>
            <strong>Line Ranges:</strong> {bet?.line_ranges}
          </p>
          <p>
            <strong>Max Multiplier:</strong> {bet?.max_mult}
          </p>
          <p>
            <strong>Cashout:</strong> {parseFloat(bet?.payout).toFixed(2)}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span style={{ color: bet?.status === "WIN" ? "green" : "red" }}>
              {bet?.status}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BetDetailModal;
