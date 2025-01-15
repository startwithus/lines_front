import React, { useEffect, useState } from "react";
import Home from "./home/Home";
import { SoundProvider } from "./context/SoundContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  const [shouldShowRotateImage, setShouldShowRotateImage] = useState(false);
  useEffect(() => {
    const adjustHeight = () => {
      const userAgent = navigator.userAgent;
      let headerHeight = 0;

      // Check device type
      if (/iPhone/i.test(userAgent)) {
        headerHeight = 90; // iPhone header height
      } else if (/Android/i.test(userAgent)) {
        headerHeight = 45; // Android header height
      } else {
        headerHeight = 60; // Default header height for other devices
      }

      // Calculate usable height
      const usableHeight = window.innerHeight - headerHeight;

      // Set custom CSS variable
      document.documentElement.style.setProperty(
        "--viewport-height",
        `${usableHeight}px`
      );
    };

    // Initial adjustment
    adjustHeight();

    // Recalculate on resize
    window.addEventListener("resize", adjustHeight);

    // Cleanup
    return () => window.removeEventListener("resize", adjustHeight);
  }, []);
  useEffect(() => {
    const handleResize = () => {
      const isLandscapeOrientation = window.innerHeight < window.innerWidth;
      const isHeightLessThan550 = window.innerHeight <= 500;
      const isWidthLessThanMaxWidth = window.innerWidth <= 950; // You can set your max-width here

      // Show the rotate image only if the device height is <= 550px, it's in landscape orientation, and width is <= max-width
      setShouldShowRotateImage(
        isLandscapeOrientation && isHeightLessThan550 && isWidthLessThanMaxWidth
      );
    };

    // Initial check on mount
    handleResize();

    // Add event listener for screen resize and orientation change
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);
  return (
    // <SoundProvider>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home shouldShowRotateImage={shouldShowRotateImage} />}
        />
      </Routes>
    </BrowserRouter>
    // </SoundProvider>
  );
};

export default App;
