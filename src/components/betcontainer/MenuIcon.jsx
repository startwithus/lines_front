import React, { useState, useEffect, useRef } from "react";
import { TfiMenu } from "react-icons/tfi";
import { LuHistory } from "react-icons/lu";
import { FaHome } from "react-icons/fa";
import BetHistory from "./BetHistory";
import { Link } from "react-router-dom";
import { IoMdSettings } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import LimitsModal from "./LimitsModal"; // Import the Limits UI Component
import { BsFillRecord2Fill } from "react-icons/bs";

const MenuIcon = ({ queryParams, info }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLobbyModal, setShowLobbyModal] = useState(false);
  const [settingModal, setSettingModal] = useState(false);
  const [limitModel, setLimitModel] = useState(false);
  const clickedOutsideRef = useRef(false);
  const modalRef = useRef(null);

  const closeAllModals = () => {
    setIsModalOpen(false);
    setShowLobbyModal(false);
    setSettingModal(false);
    setLimitModel(false);
    setIsOpen(false);
    clickedOutsideRef.current = true;
  };

  const openSettings = () => {
    if (clickedOutsideRef.current) {
      clickedOutsideRef.current = false;
      return;
    }

    if (isOpen && settingModal) {
      closeAllModals();
    } else {
      setIsOpen(true);
      setSettingModal(true);
    }
  };

  const closeSettings = () => {
    setIsOpen(false);
    setSettingModal(false);
  };

  const openBetHistory = () => {
    closeAllModals();
    setIsModalOpen(true);
  };

  const openLimits = () => {
    closeAllModals();
    setLimitModel(true);
  };

  const openLobbyModal = () => {
    closeAllModals();
    setShowLobbyModal(true);
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeAllModals();
      }
    };

    if (isOpen || isModalOpen || showLobbyModal || limitModel) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, isModalOpen, showLobbyModal, limitModel]);

  return (
    <>
      <div className="game-header-button">
        <div
          className="game-header-btton-inner"
          style={{ cursor: "pointer" }}
          onClick={openSettings}
        >
          <IoMdSettings style={{ height: "20px", width: "20px" }} />
        </div>

        {isOpen && settingModal && (
          <div className="setting-modal" ref={modalRef}>
            <div className="setting-light setting-back-light">
              <div className="setting-inner">
                <div className="setting-title">Settings</div>
                <div className="close-icon-s" onClick={closeSettings}>
                  <IoClose />
                </div>
                <div className="setting-content">
                  <div className="user-name">
                    <div className="user-name-inner">
                      <div className="name-u">UserName</div>
                      <div className="user-name-text">{info.user_id}</div>
                    </div>
                  </div>
                  <div
                    className="setting-link"
                    style={{ display: "flex", gap: "8px", cursor: "pointer" }}
                    onClick={openBetHistory}
                  >
                    <div className="setting-icon">
                      <LuHistory style={{ fontSize: "25px" }} />
                    </div>
                    <div className="setting-name">Bet History</div>
                  </div>
                  <div className="setting-link" onClick={openLimits}>
                    <div
                      className="setting-icon"
                      style={{
                        fontSize: "25px",
                        height: "1.5rem",
                        width: "1.5rem",
                      }}
                    >
                      <BsFillRecord2Fill />
                    </div>
                    <div className="setting-name">Limits</div>
                  </div>
                  <div
                    className="setting-link"
                    style={{ display: "flex", gap: "8px", cursor: "pointer" }}
                    onClick={openLobbyModal}
                  >
                    <div className="setting-icon">
                      <FaHome style={{ fontSize: "25px" }} />
                    </div>
                    <div className="setting-name">Back To Lobby</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {showLobbyModal && (
          <div className="modal-overlay" ref={modalRef}>
            <div className="modal-home">
              <p className="modal-text">Do you want to return to the lobby?</p>
              <div className="modal-actions">
                <button
                  className="btn-text btn-cancel"
                  onClick={() => setShowLobbyModal(false)}
                >
                  Cancel
                </button>
                <Link
                  // staging
                  to={`https://lobbydesign.ayodhya365.co/?id=${queryParams.id}`}
                  // producation
                  // to={`https://lobby.unicon.vip/?id=${queryParams.id}`}
                  className="btn-text btn-confirm"
                  onClick={() => setShowLobbyModal(false)}
                >
                  Confirm
                </Link>
              </div>
            </div>
          </div>
        )}

        {limitModel && (
          <LimitsModal
            isOpen={limitModel}
            onClose={() => setLimitModel(false)}
          />
        )}
      </div>

      <BetHistory
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        info={info}
      />
    </>
  );
};

export default MenuIcon;
