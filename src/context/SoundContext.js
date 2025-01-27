import React, { createContext, useState, useEffect } from "react";
import { playSound, pauseSound } from "../utility/gameSettings"; // Your utility functions
export const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const [music, setMusic] = useState(0); // Default value 50
  const [sound, setSound] = useState(0);

  useEffect(() => {
    if (sound) {
      playSound();
    } else {
      pauseSound();
    }
  }, [sound]);

  return (
    <SoundContext.Provider value={{ music, sound, setMusic, setSound }}>
      {children}
    </SoundContext.Provider>
  );
};
