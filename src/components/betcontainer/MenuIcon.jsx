import React, { useState } from 'react'
import { TfiMenu } from "react-icons/tfi";
import { LuHistory } from "react-icons/lu";
import { FaHome } from "react-icons/fa";
import BetHistory from "./BetHistory";
import './betHistory.css';
import { Link } from "react-router-dom";

const MenuIcon = ({ queryParams, info }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isBetHistoryOpen, setIsBetHistoryOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showLobbyModal, setShowLobbyModal] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    const toggleBetHistory = () => {
        setIsBetHistoryOpen(!isBetHistoryOpen);
    };

    const handleLobbyNavigation = () => {
        setShowLobbyModal(false);
    };
    return (
        <>

            <div style={{ textAlign: "end", color: "white", position: "relative" }}>
                <div style={{ cursor: "pointer" }} onClick={togglePopup}>
                    <TfiMenu />
                </div>

                {isOpen && (
                    <div
                        style={{
                            position: "absolute",
                            right: 0,
                            top: "100%", // Position below the menu icon
                            background: "#216662",
                            color: "white",
                            padding: "10px",
                            borderRadius: "5px",
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                            zIndex: 10,
                        }}
                    >
                        <div>
                            <div style={{ display: "flex", gap: "8px", cursor: "pointer" }} onClick={() => setIsModalOpen(true)}>
                                <p><LuHistory /></p>
                                <p>Bet History</p>
                            </div>
                        </div>
                        <div>
                            <div
                                className=""
                                style={{ display: "flex", gap: "8px", cursor: "pointer" }}
                                onClick={() => setShowLobbyModal(true)}
                            >
                                <p>
                                    <FaHome />
                                </p>
                                <p>Home</p>
                            </div>

                            {/* Modal */}
                            {showLobbyModal && (
                                <div className="modal-overlay">
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
                                                to={`https://lobbydesign.ayodhya365.co/?id=${queryParams.id}`}
                                                className="btn-text btn-confirm"
                                                onClick={handleLobbyNavigation}
                                            >
                                                Confirm
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <BetHistory isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} info={info} />
        </>

    )
}

export default MenuIcon