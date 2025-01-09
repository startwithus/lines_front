import React, { useState } from "react";
import { AiFillSound } from "react-icons/ai";
import { MdMusicOff } from "react-icons/md";
import { MdMusicNote } from "react-icons/md";
import { TiHome } from "react-icons/ti";
import "../models/model.css";
import { BsInfoLg } from "react-icons/bs";
import { IoInformationCircleOutline } from "react-icons/io5";
import GameInfo from "./GameInfo";
const NavbarContainer = () => {
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isMusicOn, setIsMusicOn] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const toggleSound = () => {
    setIsSoundOn((prev) => !prev);
  };

  const toggleMusic = () => {
    setIsMusicOn((prev) => !prev);
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
          <span className="border-icon">
            <AiFillSound className="icons-all" />
            {!isSoundOn && <span className="sound-line"></span>}
          </span>
          <span className="sound-text">SOUND</span>
        </li>
        <li className="MainNavbar__item direction-icnon" onClick={toggleMusic}>
          <span className="border-icon">
            {isMusicOn ? (
              <MdMusicNote className="icons-all" />
            ) : (
              <MdMusicOff className="icons-all" />
            )}
          </span>
          <span className="sound-text">MUSIC</span>
        </li>
        <li
          className="MainNavbar__item direction-icnon"
          onClick={toggleModal} // Open modal on click
        >
          <span className="border-icon" style={{ border: "2px solid #4ace4a" }}>
            <BsInfoLg className="icons-all" style={{ color: "#4ace4a" }} />
          </span>
          <span className="sound-text">INFO</span>
        </li>
        <li className="MainNavbar__item direction-icnon">
          <span className="border-icon" style={{ border: "2px solid #4ace4a" }}>
            <TiHome className="icons-all" style={{ color: "#4ace4a" }} />
          </span>
          <span className="sound-text">HOME</span>
        </li>
      </ul>
      {/* {/ Modal /} */}
      {isModalOpen && (
        <div className="game-info-modal">
          <GameInfo toggleModal={toggleModal} />
        </div>
      )}
    </div>
  );
};

export default NavbarContainer;
