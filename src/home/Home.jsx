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
  const [resultData, setResultData] = useState({})
  const [sliders, setSliders] = useState([50]); // Initial slider values
  const [totalMultiplier, setTotalMultiplier] = useState(getMaxMult([50])); // Initial multiplier
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
      const handleResult = (data) => {
        try {
          setResultData(data);
          const winningRange = data.winningRange || [];
          if (winningRange.length > 0) {
            // Clamp values between 2 and 98
            const updatedSliders = winningRange.map((value) =>
              Math.max(2, Math.min(98, value))
            );
            setSliders(updatedSliders);
            setTotalMultiplier(getMaxMult(updatedSliders));
          }

        } catch (err) {
          console.error(err);
        }
      };
      socketInstance.on("result", handleResult)
      return () => {
        socketInstance.disconnect();
      };
    }
  }, [queryParams.id]);


  const handlePlaceBet = () => {
    if (+amount > info.balance || +amount === 0) {
      return setShowBalance(true);
    }

    const dataToSend = sliders.join(",");
    socket.emit("message", `PB:${amount}:${dataToSend}`);


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
                <p>manual</p>
              </div>
            </div>
          </div>
        </div>
        <BalanceWinAmount info={info} resultData={resultData} />
        <AmountSection
          handlePlacebet={handlePlaceBet}
          amount={amount}
          setAmount={setAmount}
          isBetting={isBetting}
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
        />
      </div>
    </div>
  );
};

export default Home;
