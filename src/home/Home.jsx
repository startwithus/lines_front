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

const Home = () => {
  const location = useLocation();
  const [socket, setSocket] = useState(null);
  const [isManual, setIsManual] = useState(true);
  const [info, setInfo] = useState({});
  const [showBalance, setShowBalance] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const rawQuery = location.search.substring(1);
  const decodedQuery = decodeURIComponent(rawQuery);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState("10.00");
  const [isBetting, setIsBetting] = useState(false);
  const [resultData, setResultData] = useState({});
  const [sliders, setSliders] = useState([50]); // Initial slider values
  const [totalMultiplier, setTotalMultiplier] = useState(getMaxMult([50]));
  const [statusData, setStatusData] = useState(false); // Initialize with false
  const [iconSrc, setIconSrc] = useState(null);
  const [isRefrece, setisRefrece] = useState(false);
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

      return () => {
        socketInstance.disconnect();
      };
    } else {
      console.error("Invalid socket ID or game ID in query params.");
    }
  }, [queryParams.id]);
  // let statusData;
  // if (resultData?.isWin) {
  //   statusData = resultData.isWin;
  // }
  // console.log(statusData, "statusData");
  useEffect(() => {
    // Update statusData based on resultData
    if (resultData?.isWin) {
      setStatusData(true); // Set to true if win
      setIconSrc(icon.group3); // Set to group3 icon if win
    } else {
      setStatusData(false);
      setIconSrc(icon.group2);
    }
  }, [resultData]);

  // useEffect(() => {
  //   if (statusData === undefined || statusData === null) {
  //     setIconSrc(icon.group2);
  //   } else if (statusData) {
  //     setIconSrc(icon.group3);
  //   } else {
  //     setIconSrc(
  //       totalMultiplier < 1.05 || totalMultiplier > 5000.0
  //         ? icon.group2
  //         : icon.groupA
  //     );
  //   }
  // }, [statusData, totalMultiplier]);

  useEffect(() => {
    // Determine icon source based on totalMultiplier and statusData
    if (statusData) {
      setIconSrc(icon.group3); // If win, set to group3
    } else {
      setIconSrc(
        totalMultiplier < 1.05 || totalMultiplier > 5000.0
          ? icon.group2
          : icon.groupA
      );
    } // If bet button is clicked, show groupA icon
  }, [statusData, totalMultiplier]);


  useEffect(() => {
    // Update statusData based on resultData
    if (resultData?.isWin) {
      setStatusData(true);
    } else {
      setStatusData(false);
    }
  }, [resultData]); // Re-run whenever resultData changes

  useEffect(() => {
    // Determine icon source based on statusData and totalMultiplier
    if (!statusData) {
      setIconSrc(icon.group2); // Icon for false status (not win)
    } else if (statusData && totalMultiplier < 1.05 || totalMultiplier > 5000.0) {
      setIconSrc(icon.group2); // Icon for out-of-range multiplier
    } else {
      setIconSrc(icon.group3); // Icon for win
    }
  }, [statusData, totalMultiplier]); // Re-run whenever statusData or totalMultiplier changes




  const firstResult = resultData?.winningRange?.[0] || [];
  const secondResult = resultData?.winningRange?.[1] || [];
  const thirdResult = resultData?.winningRange?.[2] || [];


  const handlePlaceBet = () => {
    if (+amount > info.balance || +amount === 0) {
      return setShowBalance(true);
    }
    if (isBetting) return;
    setIsBetting(true);
    setisRefrece(false);
    const dataToSend = sliders.join(",");
    socket.emit("message", `PB:${amount}:${dataToSend}`);
    setTimeout(() => {
      setIsBetting(false);
      setisRefrece(true);
    }, 500);
  };
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
    <div className="container">
      <div className="Pane__inner">
        <div className="manual-side-container">
          <div className="manual-btn-container">
            <div className="manual-bg">
              <div className="manual-btn">
                <p>Manual</p>
              </div>
              <div className="Auto-btn">
                <p>Auto</p>
              </div>
            </div>
          </div>
        </div>
        <BalanceWinAmount
          info={info}
          resultData={resultData}
          isBetting={isBetting}
        />
        <AmountSection
          handlePlacebet={handlePlaceBet}
          amount={amount}
          setAmount={setAmount}
          isBetting={isBetting}
          totalMultiplier={totalMultiplier}
        />
        <div className="main-navbar-container">
          <NavbarContainer />
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
        />
      </div>
    </div>
  );
};

export default Home;
