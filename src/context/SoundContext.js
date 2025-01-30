import React, { createContext, useState, useEffect } from "react";
import { playSound, pauseSound } from "../utility/gameSettings"; // Your utility functions

export const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  // Get stored values from localStorage
  const storedMusic = localStorage.getItem("music");
  const storedSound = localStorage.getItem("sound");

  const [music, setMusic] = useState(
    storedMusic !== null ? Number(storedMusic) : 50
  );
  const [sound, setSound] = useState(
    storedSound !== null ? Number(storedSound) : 50
  );

  // Play sound on initial load if it's on
  useEffect(() => {
    if (sound) {
      playSound();
    }
  }, []); // Run only once on mount

  // Whenever sound state changes, play/pause sound and store in localStorage
  useEffect(() => {
    if (sound) {
      playSound();
    } else {
      pauseSound();
    }
    localStorage.setItem("sound", sound);
  }, [sound]);

  // Store music value in localStorage
  useEffect(() => {
    localStorage.setItem("music", music);
  }, [music]);

  return (
    <SoundContext.Provider value={{ music, sound, setMusic, setSound }}>
      {children}
    </SoundContext.Provider>
  );
};
