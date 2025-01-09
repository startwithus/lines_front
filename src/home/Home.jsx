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

const Home = () => {
  const location = useLocation();
  const [socket, setSocket] = useState(null);
  const [info, setInfo] = useState({});
  const [socketConnected, setSocketConnected] = useState(false);
  const [showBalance, setShowBalance] = useState(false);
  const rawQuery = location.search.substring(1);
  const decodedQuery = decodeURIComponent(rawQuery);
  const [loading, setLoading] = useState(true);

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
      // const handleBet = (data) => {
      //   try {
      //     setAllBetData((oldata) => [...new Set([data, ...oldata])]);
      //     setCurrentMax(data);
      //   } catch (err) {
      //     console.error(err);
      //   }
      // };
      // const handleCashout = (data) => {
      //   try {
      //     setCashoutData((oldata) => [...new Set([...oldata, data])]);
      //     if (data) {
      //       setCashModal(true);
      //       if (sound) {
      //         playCashoutSound();
      //       }
      //     }
      //   } catch (err) {
      //     console.error(err);
      //   }
      // };
      // socketInstance.on("bets", handleBet);
      // socketInstance.on("cashout", handleCashout);
      // socketInstance.on("betError", (data) => {
      //   setError(data);
      //   setErrorModal(true);
      // });
      return () => {
        socketInstance.disconnect();
      };
    }
  }, [queryParams.id]);
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
        <BalanceWinAmount info={info} />
        <AmountSection />
        <div className="main-navbar-container">
          <NavbarContainer />
        </div>
      </div>

      <div className="show-bet-graph-container">
        <MultiplierProgress />
      </div>
    </div>
  );
};

export default Home;
