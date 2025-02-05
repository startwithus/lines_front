import React, { useEffect, useState, useRef } from "react";
import { getCaller } from "../../utility/api";
import BetDetailModal from "./BetDetailModal"; // New component

const BetHistory = ({ isOpen, onClose, info, totalMultiplier, resultData }) => {
  const [betData, setBetData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [selectedBet, setSelectedBet] = useState(null); // Store clicked bet
  const tableRef = useRef(null);

  const limit = 10;

  const getBetHistory = async (newOffset = 0, append = false) => {
    try {
      setLoading(true);
      const res = await getCaller(
        `ln/bets?userId=${info?.user_id}&operator_id=${info?.operator_id}&limit=${limit}&offset=${newOffset}`
      );
      const newData = res?.data || [];

      setBetData(append ? [...betData, ...newData] : newData);
      setHasMore(newData.length === limit);
    } catch (error) {
      console.error("Error fetching bet history:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && info?.user_id && info?.operator_id) {
      setOffset(0);
      getBetHistory(0);
    }
  }, [isOpen, info]);

  const handleLoadMore = () => {
    const newOffset = offset + limit;
    setOffset(newOffset);
    getBetHistory(newOffset, true);
  };

  // Scroll to bottom when new data loads
  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.scrollTop = tableRef.current.scrollHeight;
    }
  }, [betData]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay-bet" onClick={onClose}>
      <div className="modal-content-bet" onClick={(e) => e.stopPropagation()}>
        <div className="history-bet">
          <p style={{ color: "#fff" }}>Bet History</p>
          <button className="close-btn" onClick={onClose}>
            Close
          </button>
        </div>

        <div
          className="table-container"
          ref={tableRef}
          style={{ maxHeight: "455px", overflowY: "auto" }}
        >
          <div className="table-wrapper">
            {loading && betData.length === 0 ? (
              <p>Loading bet history...</p>
            ) : betData.length > 0 ? (
              <>
                <table className="betsTable">
                  <thead className="table-head">
                    <tr>
                      <th style={{ color: "rgb(128, 128, 128)" }}>Time</th>
                      <th style={{ color: "rgb(128, 128, 128)" }}>Bet</th>
                      <th style={{ color: "rgb(128, 128, 128)" }}>Range</th>
                      <th style={{ color: "rgb(128, 128, 128)" }}>Max Mult</th>
                      <th style={{ color: "rgb(128, 128, 128)" }}>Cashout</th>
                      <th style={{ color: "rgb(128, 128, 128)" }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {betData.map((el, index) => (
                      <tr
                        key={index}
                        style={{ fontSize: "13px", cursor: "pointer" }}
                        onClick={() => setSelectedBet(el)} // Open modal with clicked bet
                      >
                        <td style={{ color: "rgb(128, 128, 128)" }}>
                          {new Date(el?.created_at).toLocaleTimeString()}
                        </td>
                        <td>{parseFloat(el?.bet_amount).toFixed(2)}</td>
                        <td>{el?.line_ranges}</td>
                        <td>{el?.max_mult}</td>
                        <td>{parseFloat(el?.payout).toFixed(2)}</td>
                        <td
                          style={{
                            color: el?.status === "WIN" ? "green" : "red",
                            fontWeight: "bold",
                          }}
                        >
                          {el?.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <p>No bet history available.</p>
            )}
          </div>
        </div>
        {betData.length > 0 && hasMore && betData.length % limit === 0 && (
          <div className="load-more-container">
            <button
              className="load-more-btn"
              onClick={handleLoadMore}
              disabled={loading}
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>

      {/* Show the Bet Detail Modal when a bet is clicked */}
      {selectedBet && (
        <BetDetailModal
          bet={selectedBet}
          totalMultiplier={totalMultiplier}
          resultData={resultData}
          onClose={() => setSelectedBet(null)}
        />
      )}
    </div>
  );
};

export default BetHistory;
