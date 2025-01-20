import React, { useEffect, useState } from "react";
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
  const [sliders, setSliders] = useState([50]);
  const [totalMultiplier, setTotalMultiplier] = useState(getMaxMult([50]));

  // Parse query parameters from URL
  let queryParams = {};
  try {
    queryParams = JSON.parse(
      '{"' + decodedQuery.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
      (key, value) => (key === "" ? value : decodeURIComponent(value))
    );
  } catch (e) {
    console.error("Error parsing query params:", e);
  }

  // Socket connection setup
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
        setResultData(data);
      });

      return () => {
        socketInstance.disconnect();
      };
    } else {
      console.error("Invalid socket ID or game ID in query params.");
    }
  }, [queryParams.id]);

  const firstResult = resultData?.winningRange?.[0] || [];
  const secondResult = resultData?.winningRange?.[1] || [];
  const thirdResult = resultData?.winningRange?.[2] || [];

  const handlePlaceBet = () => {
    if (+amount > info.balance || +amount === 0) {
      setShowBalance(true);
      return;
    }

    if (isBetting) return;

    setIsBetting(true);
    const dataToSend = sliders.join(",");
    socket.emit("message", `PB:${amount}:${dataToSend}`);

    setTimeout(() => {
      setIsBetting(false);

    }, 500);
  };

  // Loader and error handling if socket not connected or user info missing
  if (loading || !socketConnected) {
    return <Loader message={"Connecting..."} />;
  }

  if (Object.keys(info).length === 0 && !loading) {
    return <UserNot />;
  }

  return (
    <div className="container">
      <div className="Pane__inner">
        <div className="manual-side-container">
          <div className="manual-btn-container">
            <div className="manual-bg">
              <div className="manual-btn">
                <p>manual</p>
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
          setIsBetting={setIsBetting}
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
        />
      </div>
    </div>
  );
};

export default Home;
