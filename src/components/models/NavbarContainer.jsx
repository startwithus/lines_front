import React, { useState } from "react";
import { TiHome } from "react-icons/ti";
import "../models/model.css";
import GameInfo from "./GameInfo";
import { icon } from "../../utility/icon";
import { Link } from "react-router-dom";
const NavbarContainer = ({ queryParams }) => {
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isMusicOn, setIsMusicOn] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [isActive, setIsActive] = useState(false);
  const [isMusicDisabled, setIsMusicDisabled] = useState(false); // State to disable music toggle
  const [isTurbo, setIsTurbo] = useState(true); // State to toggle image

  const toggleSound = () => {
    const newSoundState = !isSoundOn;
    setIsSoundOn(newSoundState);
    setIsMusicDisabled(!newSoundState); // Disable music toggle when sound is turned off
    if (!newSoundState) {
      setIsMusicOn(false); // Ensure music is turned off when sound is off
    }
  };
  const toggleTurbo = () => {
    setIsTurbo((prev) => !prev); // Toggle between true and false
  };

  const toggleMusic = () => {
    if (!isMusicDisabled) {
      setIsMusicOn(!isMusicOn);
    }
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev); // Toggle modal visibility
  };

  return (
    <div className="main-navbar">
      <ul className="MainNavbar__list">
        <li
          className="MainNavbar__item"
          onClick={toggleSound}
          style={{ cursor: "pointer" }}
        >
          <img
            src={isSoundOn ? icon.soundIcon : icon.unSoundIcon}
            alt={isSoundOn ? "Sound On" : "Sound Off"}
          />
          <span className="sound-text">SOUND</span>
        </li>

        <li
          className={`MainNavbar__item ${isMusicDisabled ? "disabled" : ""}`}
          onClick={toggleMusic}
          style={{
            cursor: isMusicDisabled ? "not-allowed" : "pointer",
            opacity: isMusicDisabled ? 0.5 : 1,
            color: isMusicDisabled ? "gray" : "inherit",
          }}
        >
          <img
            src={
              isMusicOn && !isMusicDisabled ? icon.muteIcon : icon.unmuteIcon
            }
            alt={isMusicOn && !isMusicDisabled ? "Music On" : "Music Off"}
          />
          <span className="sound-text">MUSIC</span>
        </li>

        <li
          className="MainNavbar__item"
          onClick={toggleTurbo}
          style={{ cursor: "pointer" }}
        >
          <img
            src={isTurbo ? icon.turboIcon : icon.unknownTurbo}
            alt={isTurbo ? "Turbo Icon" : "Unknown Turbo Icon"}
          />
          <span className="sound-text">TURBO</span>
        </li>

        <li
          className="MainNavbar__item"
          onClick={toggleModal}
          style={{ cursor: "pointer" }}
        >
          <img src={icon.infoIcon} alt="Info Icon" />
          <span className="sound-text">INFO</span>
        </li>

        <Link
          to={`https://lobbydesign.ayodhya365.co/?id=${queryParams.id}`}
          className="MainNavbar__item"
          style={{ cursor: "pointer", textDecoration: "none" }}
        >
          <img src={icon.homeIcon} alt="Home Icon" />
          <span className="sound-text">HOME</span>
        </Link>
      </ul>

      {isModalOpen && (
        <div className="game-info-modal">
          <GameInfo toggleModal={toggleModal} />
        </div>
      )}
    </div>
  );
};

export default NavbarContainer;
