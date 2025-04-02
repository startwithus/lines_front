import React, { useEffect, useState, useContext } from "react";
import NavbarContainer from "../components/models/NavbarContainer";
import BalanceWinAmount from "../components/BalanceWinAmount";
import MultiplierProgress from "../components/betcontainer/MultiplierProgress";
import AmountSection from "../components/betcontainer/AmountSection";
import "../components/betcontainer/betcontainer.css";
import { createSocket } from "../utility/newSocket";
import { useLocation } from "react-router-dom";
import Loader from "../components/loader/Loader";
import UserNot from "../components/loader/UserNot";
import { getMaxMult } from "../utility/helper";
import { icon } from "../utility/icon";
import { SoundContext } from "../context/SoundContext";
import NotEnoughBalance from "../components/error/NotEnoughBalance";
import ErrorModal from "../components/error/ErrorModal";
import {
  playLossSound,
  playWinSound,
  playWhiteLine,
  pauseWhiteLine,
} from "../utility/gameSettings";

const Home = ({ shouldShowRotateImage }) => {
  const location = useLocation();
  const [socket, setSocket] = useState(null);
  const [info, setInfo] = useState({});
  const [showBalance, setShowBalance] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const rawQuery = location.search.substring(1);
  const decodedQuery = decodeURIComponent(rawQuery);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState("10.00");
  const [isBetting, setIsBetting] = useState(false);
  const [resultData, setResultData] = useState({});
  const [sliders, setSliders] = useState([50]);
  const [totalMultiplier, setTotalMultiplier] = useState(getMaxMult([50]));
  const [statusData, setStatusData] = useState(false);
  const [iconSrc, setIconSrc] = useState(icon.groupA);
  const [isRefrece, setisRefrece] = useState(false);
  const [isbno, setsetisbno] = useState(false);
  const [isZoomOut, setIsZoomOut] = useState(false);
  const [firstResult, setFirstResult] = useState([]);
  const [secondResult, setSecondResult] = useState([]);
  const [thirdResult, setThirdResult] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);
  const [autobetTab, setAutobetTab] = useState(0);
  const [autobet, setAutobet] = useState(0);
  const { sound } = useContext(SoundContext);
  const [isTurbo, setIsTurbo] = useState(false); // Added Turbo state
  const [errorModal, setErrorModal] = useState(false);
  const [error, setError] = useState("");
  const [winAmount1, setwinAmount1] = useState(false);

  // Initial multiplier
  console.log(sliders);
  let queryParams = {};
  try {
    queryParams = JSON.parse(
      '{"' + decodedQuery.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
      function (key, value) {
        return key === "" ? value : decodeURIComponent(value);
      }
    );
  } catch (e) {
    queryParams = {};
  }

  // socket connection
  useEffect(() => {
    if (queryParams.id) {
      const socketInstance = createSocket(queryParams.id, queryParams.game_id);
      setSocket(socketInstance);
      socketInstance.on("connect", () => {
        setSocketConnected(true);
      });
      socketInstance.on("disconnect", () => {
        setSocketConnected(false);
      });
      socketInstance.on("info", (data) => {
        setInfo(data);
        setLoading(false);
      });
      socketInstance.on("result", (data) => {
        console.log("Result", data);
        setResultData(data);
      });
      socketInstance.on("betError", (data) => {
        setError(data);
        setErrorModal(true);
      });
      // const handleResult = (data) => {
      //   try {
      //     setResultData(data);

      //     const winningRange = data.winningRange || [];
      //     if (winningRange.length > 0) {
      //       const updatedSliders = winningRange.map((value) =>
      //         Math.max(2, Math.min(98, value))
      //       );

      //       setSliders(updatedSliders);
      //     }
      //   } catch (err) {
      //     console.error(err);
      //   }
      // };

      // socketInstance.on("result", handleResult);
      return () => {
        socketInstance.disconnect();
      };
    } else {
      console.error("Invalid socket ID or game ID in query params.");
    }
  }, [queryParams.id]);
  useEffect(() => {
    if (errorModal) {
      const timer = setTimeout(() => {
        setErrorModal(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [errorModal]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (resultData?.isWin === true) {
        if (sound) {
          playWinSound();
        }
        setStatusData(true);
        setIconSrc(icon.group3);
      } else if (resultData?.isWin === false) {
        if (sound) {
          playLossSound();
        }
        setStatusData(false);
        setIconSrc(icon.group2);
      }
    }, 990); // 990ms delay

    return () => clearTimeout(timeout); // Cleanup timeout when dependencies change
  }, [resultData, sound]);

  // Separate useEffect for totalMultiplier check
  useEffect(() => {
    if (totalMultiplier < 1.05 || totalMultiplier > 5000.0) {
      setStatusData(false);
      setIconSrc(icon.group2); // Use group2 if totalMultiplier is out of range
    } else {
      setIconSrc(icon.groupA); // Default case
    }
  }, [totalMultiplier]);

  // let firstResult;
  // let secondResult;
  // let thirdResult;

  // if (resultData?.winningRange) {
  //   firstResult = resultData?.winningRange?.[0] || [];
  //   secondResult = resultData?.winningRange?.[1] || [];
  //   thirdResult = resultData?.winningRange?.[2] || [];
  // }
  // Update results when resultData changes
  // useEffect(() => {
  //   setFirstResult(resultData?.winningRange?.[0] || 0);
  //   setSecondResult(resultData?.winningRange?.[1] || 0);
  //   setThirdResult(resultData?.winningRange?.[2] || 0);
  // }, [resultData]);
  useEffect(() => {
    if (sound) {
      playWhiteLine();
    } else {
      pauseWhiteLine();
    }
    setFirstResult(
      resultData?.winningRange?.[0] !== undefined
        ? resultData.winningRange[0]
        : "0"
    );
    setSecondResult(
      resultData?.winningRange?.[1] !== undefined
        ? resultData.winningRange[1]
        : "0"
    );
    setThirdResult(
      resultData?.winningRange?.[2] !== undefined
        ? resultData.winningRange[2]
        : "0"
    );
  }, [resultData]);

  const handleResult = (data) => {
    setResultData(data);
  };
  useEffect(() => {
    if (resultData?.winAmount) {
      const timer = setTimeout(() => {
        setwinAmount1(resultData?.winAmount);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [resultData]);
  const handlePlaceBet = () => {
    if (+amount > info.balance || +amount === 0) {
      return setShowBalance(true);
    }
    if (isBetting) return;
    setIconSrc(icon.groupA);
    // Start betting
    setIsBetting(true);
    setisRefrece(false);
    setsetisbno(false);
    setResultData(true);
    setwinAmount1(false);
    // Temporarily disable refreshing
    const dataToSend = sliders.join(",");

    // Emit the betting event
    socket.emit("message", `PB:${amount}:${dataToSend}`);

    // Delay refreshing to avoid UI flickers
    setTimeout(() => {
      socket.once("result", (data) => {
        handleResult(data);
      });

      setisRefrece(true);
      setResultData(false);
    }, 5);
    setTimeout(() => {
      setIsBetting(false);
    }, 1500);
    setTimeout(() => {
      setsetisbno(true);
    }, 1000);
    // Stop betting after a defined period
  };
  const buttonStyle = (disabled) => ({
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
  });
  const handleCanvasLoad = (status) => {
    setLoading(!status);
  };
  // if socket not connected
  if (loading || !socketConnected) {
    return <Loader message={"Connecting..."} />;
  } // if user not connected
  if (Object.keys(info)?.length === 0 && !loading) {
    return <UserNot />;
  }

  return (
    <>
      {shouldShowRotateImage ? (
        // Show rotate image
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#000",
            color: "#fff",
            textAlign: "center",
          }}
        >
          <img
            src={icon.rotate}
            alt="Rotate your phone"
            style={{ width: "50%", marginBottom: "1rem" }}
          />
        </div>
      ) : (
        <div className="container">
          <div className="Pane__inner">
            <div className="manual-side-container">
              <div className="manual-btn-container">
                <div className="manual-bg">
                  <div
                    className={`manual-btn ${
                      autobetTab === 0 ? "manual-btn-active" : ""
                    } ${
                      isBetting ||
                      autobet ||
                      totalMultiplier < 1.05 ||
                      totalMultiplier < 1.05 ||
                      totalMultiplier > 5000.0
                        ? "manual-btn-disabled"
                        : ""
                    }`} // Add disabled class when conditions are met
                    style={{
                      color: autobetTab === 0 ? "black" : "white",
                      cursor:
                        isBetting ||
                        autobet ||
                        totalMultiplier < 1.05 ||
                        totalMultiplier > 5000.0
                          ? "not-allowed"
                          : "pointer", // Disable cursor when conditions are met
                      opacity:
                        isBetting ||
                        autobet ||
                        totalMultiplier < 1.05 ||
                        totalMultiplier > 5000.0
                          ? 0.5
                          : 1, // Visual feedback for disabled state
                    }}
                    onClick={() =>
                      !isBetting &&
                      !autobet &&
                      totalMultiplier >= 1.05 &&
                      totalMultiplier <= 5000.0 &&
                      setAutobetTab(0)
                    } // Prevent click if conditions are met
                  >
                    <p>Manual</p>
                  </div>
                  <div
                    className={`manual-btn ${
                      autobetTab === 1 ? "manual-btn-active" : ""
                    } ${
                      isBetting ||
                      autobet ||
                      totalMultiplier < 1.05 ||
                      totalMultiplier > 5000.0
                        ? "manual-btn-disabled"
                        : ""
                    }`} // Add disabled class when conditions are met
                    style={{
                      color: autobetTab === 1 ? "black" : "white",
                      cursor:
                        isBetting ||
                        autobet ||
                        totalMultiplier < 1.05 ||
                        totalMultiplier > 5000.0
                          ? "not-allowed"
                          : "pointer", // Disable cursor when conditions are met
                      opacity:
                        isBetting ||
                        autobet ||
                        totalMultiplier < 1.05 ||
                        totalMultiplier > 5000.0
                          ? 0.5
                          : 1, // Visual feedback for disabled state
                    }}
                    onClick={() =>
                      !isBetting &&
                      !autobet &&
                      totalMultiplier >= 1.05 &&
                      totalMultiplier <= 5000.0 &&
                      setAutobetTab(1)
                    } // Prevent click if conditions are met
                  >
                    <p>Auto</p>
                  </div>
                </div>
              </div>
            </div>
            <BalanceWinAmount
              info={info}
              resultData={resultData}
              statusData={statusData}
              setStatusData={setStatusData}
              winAmount1={winAmount1}
            />
            <AmountSection
              handlePlacebet={handlePlaceBet}
              amount={amount}
              setAmount={setAmount}
              autobetTab={autobetTab}
              isBetting={isBetting}
              setAutobet={setAutobet}
              autobet={autobet}
              totalMultiplier={totalMultiplier}
              setTotalMultiplier={setTotalMultiplier}
              info={info}
              setShowBalance={setShowBalance}
            />
            <div className="main-navbar-container">
              <NavbarContainer
                queryParams={queryParams}
                isTurbo={isTurbo}
                setIsTurbo={setIsTurbo}
              />
            </div>
          </div>
          <div className="show-bet-graph-container">
            <MultiplierProgress
              setSliders={setSliders}
              sliders={sliders}
              totalMultiplier={totalMultiplier}
              setTotalMultiplier={setTotalMultiplier}
              isBetting={isBetting}
              firstResult={firstResult}
              secondResult={secondResult}
              thirdResult={thirdResult}
              iconSrc={iconSrc}
              isRefrece={isRefrece}
              isbno={isbno}
              statusData={statusData}
              setIconSrc={setIconSrc}
              setResultData={setResultData}
              isTurbo={isTurbo}
              setAutobet={setAutobet}
              autobet={autobet}
              queryParams={queryParams}
              info={info}
            />
          </div>
        </div>
      )}

      {showBalance && (
        <NotEnoughBalance
          setShowBalance={setShowBalance}
          showBalance={showBalance}
        />
      )}

      {errorModal && <ErrorModal error={error} setErrorModal={setErrorModal} />}
    </>
  );
};

export default Home;
