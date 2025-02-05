import React, { useEffect, useState, useRef } from "react";
import { getCaller } from "../../utility/api";
import BetDetailModal from "./BetDetailModal"; // New component

const BetHistory = ({ isOpen, onClose, info, totalMultiplier, resultData }) => {
  const [betData, setBetData] = useState([]); // Stores all bet data
  const [displayedData, setDisplayedData] = useState([]); // Stores paginated data
  const [loading, setLoading] = useState(false);
  const [selectedBet, setSelectedBet] = useState(null); // Stores the selected bet for the modal
  const tableRef = useRef(null);

  const limit = 10; // Number of records per fetch

  const getBetHistory = async () => {
    try {
      setLoading(true);
      const res = await getCaller(
        `ln/bets?userId=${info?.user_id}&operator_id=${info?.operator_id}&limit=100` // Fetch all data at once
      );

      const newData = res?.data || [];
      setBetData(newData);
      setDisplayedData(newData.slice(0, limit)); // Show only first 10 records initially
    } catch (error) {
      console.error("Error fetching bet history:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && info?.user_id && info?.operator_id) {
      setBetData([]);
      setDisplayedData([]);
      getBetHistory();
    }
  }, [isOpen, info]);

  const handleLoadMore = () => {
    const currentLength = displayedData.length;
    const nextData = betData.slice(currentLength, currentLength + limit);
    setDisplayedData([...displayedData, ...nextData]);
  };

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
          style={{ overflowY: "auto" }}
        >
          <div className="table-wrapper">
            {loading && betData.length === 0 ? (
              <p>Loading bet history...</p>
            ) : betData.length > 0 ? (
              <>
                <div className="table-container">
                  <table className="betsTable">
                    <thead className="table-head">
                      <tr>
                        <th>Time</th>
                        <th>Bet</th>
                        <th>Range</th>
                        <th>Max Mult</th>
                        <th>Cashout</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayedData.map((el, index) => (
                        <tr
                          key={index}
                          style={{ fontSize: "13px", cursor: "pointer" }}
                          onClick={() => setSelectedBet(el)} // Open modal with clicked bet
                        >
                          <td>
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
                </div>
              </>
            ) : (
              <p>No bet history available.</p>
            )}
          </div>
          {displayedData.length < betData.length && (
            <div className="load-more-container">
              <button className="load-more-btn" onClick={handleLoadMore}>
                Load More
              </button>
            </div>
          )}
        </div>
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
