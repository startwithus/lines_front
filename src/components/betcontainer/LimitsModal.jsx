import React from "react";
import { IoMdClose } from "react-icons/io";
import "../betcontainer/betcontainer.css";
function LimitsModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="overlay-1">
      <div className="modal-new">
        <div className="modal-head" style={{ paddingLeft: "0" }}>
          <div
            className="limit-head"
            style={{ fontSize: "0.9rem", fontWeigh: "500" }}
          >
            Limits
          </div>
          <div onClick={onClose}>
            <IoMdClose
              className="close"
              style={{ fontSize: "18px", fontWeight: "bolder" }}
            />
          </div>
        </div>
        <div className="modal-body" style={{ gap: "1.5rem" }}>
          <div className="limit-block">
            <p className="value-para">Min Bet</p>
            <p className="value">10.00</p>
          </div>
          <div className="limit-block">
            <p className="value-para">Max Bet</p>
            <p className="value">10,000.00</p>
          </div>
          <div className="limit-block">
            <p className="value-para">Max Profit</p>
            <p className="value">10,00,000.00</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LimitsModal;
