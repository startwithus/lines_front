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
        {/* {/ Sound Toggle /} */}
        <li
          className="MainNavbar__item"
          onClick={toggleSound}
          style={{ cursor: "pointer" }}
        >
          {isSoundOn ? (
            <img src={icon.soundIcon} alt="Sound On" />
          ) : (
            <img src={icon.unSoundIcon} alt="Sound Off" />
          )}
          <span className="sound-text">SOUND</span>
        </li>

        {/* {/ Music Toggle /} */}
        <li
          className={`MainNavbar__item ${isMusicDisabled ? "disabled" : ""}`}
          onClick={toggleMusic}
          style={{
            cursor: isMusicDisabled ? "not-allowed" : "pointer",
            opacity: isMusicDisabled ? 0.5 : 1, // Reduce opacity when disabled
            color: isMusicDisabled ? "gray" : "inherit", // Change text/icon color to gray
          }}
        >
          {isMusicOn && !isMusicDisabled ? (
            <img src={icon.muteIcon} alt="Music On" />
          ) : (
            <img src={icon.unmuteIcon} alt="Music Off" />
          )}
          <span className="sound-text">MUSIC</span>
        </li>

        <li
          className="MainNavbar__item"
          onClick={toggleTurbo}
          style={{ cursor: "pointer" }}
        >
          <img
            src={isTurbo ? icon.turboIcon : icon.unknownTurbo} // Conditional rendering of the image
            alt={isTurbo ? "Turbo Icon" : "Unknown Turbo Icon"}
          />
          <span className="sound-text">TURBO</span>
        </li>
        <li
          className="MainNavbar__item"
          onClick={toggleModal} // Open modal on click
        >
          <span className="">
            <img src={icon.infoIcon} alt="" />
          </span>
          <span className="sound-text">INFO</span>
        </li>
        <Link to={`https://lobbydesign.ayodhya365.co/?id=${queryParams.id}`}>
          <li className="MainNavbar__item" style={{ cursor: "pointer" }}>
            <img
              src={icon.homeIcon} // Conditional rendering of the image
              alt={isTurbo ? "home" : "Unknown home Icon"}
            />
            <span className="sound-text">Home</span>
          </li>
        </Link>
      </ul>
      {/* {/ {/ Modal /} /} */}
      {isModalOpen && (
        <div className="game-info-modal">
          <GameInfo toggleModal={toggleModal} />
        </div>
      )}
    </div>
  );
};

export default NavbarContainer;
