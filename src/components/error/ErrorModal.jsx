import React from "react";
import "../error/error.css";
const ErrorModal = ({ setErrorModal, error }) => {
  return (
    <div className="error-modal" style={{ background: "red" }}>
      <div className="modal-content-error">
        <p className="session-para" style={{ fontSize: "20px" }}>
          {error}
        </p>
        <button
          onClick={() => setErrorModal(false)}
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

export default ErrorModal;
