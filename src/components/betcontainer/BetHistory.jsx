import React, { useEffect, useState, useRef } from "react";
import { getCaller } from "../../utility/api";

const BetHistory = ({ isOpen, onClose, info }) => {
    const [betData, setBetData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const tableRef = useRef(null);

    const limit = 10;

    const getBetHistory = async (newOffset = 0, append = false) => {
        try {
            setLoading(true);
            const res = await getCaller(
                `ln/bets?userId=${info?.user_id}&operator_id=${info?.operator_id}&limit=${limit}&offset=${newOffset}`
            );
            const newData = res?.data || [];

            if (append) {
                setBetData((prev) => [...prev, ...newData]);
            } else {
                setBetData(newData);
            }

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

    // Scroll to bottom whenever new data is loaded
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
                    <h2 style={{ color: "white" }}>Bet History</h2>
                    <button className="close-btn" onClick={onClose}>Close</button>
                </div>

                <div className="table-container" ref={tableRef} style={{ maxHeight: "400px", overflowY: "auto" }}>
                    <div className="table-wrapper">
                        {loading && betData.length === 0 ? (
                            <p>Loading bet history...</p>
                        ) : betData.length > 0 ? (
                            <>
                                <table>
                                    <thead>
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
                                        {betData.map((el, index) => (
                                            <tr key={index}>
                                                <td>{new Date(el?.created_at).toLocaleTimeString()}</td>
                                                <td>{parseFloat(el?.bet_amount).toFixed(2)}</td>
                                                <td>{el?.line_ranges}</td>
                                                <td>{el?.max_mult}</td>
                                                <td>{parseFloat(el?.payout).toFixed(2)}</td>
                                                <td
                                                    style={{
                                                        color: el?.status === "WIN" ? "green" : "red",
                                                        fontWeight: "bold"
                                                    }}
                                                >
                                                    {el?.status}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {hasMore && (
                                    <div className="load-more-container">
                                        <button className="load-more-btn" onClick={handleLoadMore} disabled={loading}>
                                            {loading ? "Loading..." : "Load More"}
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <p>No bet history available.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BetHistory;
