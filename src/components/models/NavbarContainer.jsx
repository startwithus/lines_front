import React, { useContext, useState } from "react";
import { icon } from "../../utility/icon";
import "../models/model.css";
import GameInfo from "./GameInfo";
import { SoundContext } from "../../context/SoundContext";
import {
  pauseSound,
  playSound,
  playBgMusic,
  pauseBgMusic,
} from "../../utility/gameSettings";
import { Link } from "react-router-dom";

const NavbarContainer = ({ queryParams, isTurbo, setIsTurbo }) => {
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [isMusicOn, setIsMusicOn] = useState(false);
  const [isMusicDisabled, setIsMusicDisabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLobbyModal, setShowLobbyModal] = useState(false);
  const { sound, setSound, music, setMusic } = useContext(SoundContext);

  // Toggle Turbo mode
  const toggleTurbo = () => {
    setIsTurbo((prev) => !prev);
  };

  const toggleSound = () => {
    const newSoundState = !isSoundOn;
    setIsSoundOn(newSoundState);
    setIsMusicDisabled(!newSoundState);

    if (!newSoundState) {
      setIsMusicOn(false);
      pauseBgMusic();
    }
  };

  const toggleSoundWin = () => {
    if (sound) {
      setSound(false);
      pauseSound();
    } else {
      setSound(true);
      playSound();
    }
  };

  const toggleMusic = () => {
    if (!isMusicDisabled) {
      setIsMusicOn((prev) => {
        const newMusicState = !prev;
        if (newMusicState) {
          playBgMusic();
        } else {
          pauseBgMusic();
        }
        return newMusicState;
      });
    }
  };

  const toggleMusicSound = () => {
    if (!isMusicDisabled) {
      if (music) {
        setMusic(false);
        pauseBgMusic();
      } else {
        setMusic(true);
        playBgMusic();
      }
    }
  };

  const toggleInfoModal = () => setIsModalOpen((prev) => !prev);

  const handleLobbyNavigation = () => {
    setShowLobbyModal(false);
  };

  return (
    <div className="main-navbar">
      <ul className="MainNavbar__list">
        <li
          className="MainNavbar__item"
          onClick={() => {
            toggleSoundWin();
            toggleSound();
          }}
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
          onClick={() => {
            if (!isMusicDisabled) {
              toggleMusic();
              toggleMusicSound();
            }
          }}
          style={{
            cursor: isMusicDisabled ? "not-allowed" : "pointer",
            opacity: isMusicDisabled ? 0.5 : 1,
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

        {/* Turbo Button */}
        {/* <li
          className="MainNavbar__item"
          onClick={toggleTurbo}
          style={{ cursor: "pointer" }}
        >
          <img
            src={isTurbo ? icon.turboIcon : icon.unknownTurbo} // Conditional rendering of the image
            alt={isTurbo ? "Turbo Icon" : "Unknown Turbo Icon"}
          />
          <span className="sound-text">TURBO</span>
        </li> */}

        <li
          className="MainNavbar__item"
          onClick={toggleInfoModal}
          style={{ cursor: "pointer" }}
        >
          <img src={icon.infoIcon} alt="Info Icon" />
          <span className="sound-text">INFO</span>
        </li>

        <li
          className="MainNavbar__item"
          onClick={() => setShowLobbyModal(true)}
          style={{ cursor: "pointer" }}
        >
          <img src={icon.homeIcon} alt="Home Icon" />
          <span className="sound-text">HOME</span>
        </li>
      </ul>

      {isModalOpen && (
        <div className="game-info-modal">
          <GameInfo toggleModal={toggleInfoModal} />
        </div>
      )}

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
                to={`https://lobby.unicon.vip/?id=${queryParams.id}`}
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
  );
};

export default NavbarContainer;
