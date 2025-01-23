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
  const [firstResult, setFirstResult] = useState([]);
  const [secondResult, setSecondResult] = useState([]);
  const [thirdResult, setThirdResult] = useState([]);
  const [isZoomOut, setIsZoomOut] = useState(false);

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

  useEffect(() => {
    if (resultData?.isWin) {
      setStatusData(true);
      setIconSrc(icon.group3);
    } else {
      setStatusData(false);
      setIconSrc(icon.group2);
    }
  }, [resultData]);



  useEffect(() => {
    if (statusData === true) {
      setIconSrc(icon.group3);
      setIsZoomOut(true);

      setTimeout(() => setIsZoomOut(false), 500);
    } else {
      setIconSrc(
        totalMultiplier < 1.05 || totalMultiplier > 5000.0
          ? icon.group2
          : icon.groupA
      );
    }
  }, [statusData, totalMultiplier]);

  useEffect(() => {
    if (resultData?.winningRange) {
      setFirstResult(resultData.winningRange[0] || []);
      setSecondResult(resultData.winningRange[1] || []);
      setThirdResult(resultData.winningRange[2] || []);
    }
  }, [resultData]);

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
          setResultData={setResultData}
        />
        <div className="main-navbar-container">
          <NavbarContainer queryParams={queryParams} />
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
          statusData={statusData}
          setisRefrece={setisRefrece}
          isZoomOut={isZoomOut}
        />
      </div>
    </div>
  );
};

export default Home;
