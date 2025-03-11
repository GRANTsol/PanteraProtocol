import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";
import Notification from "./Notification";

const RecentAudits = () => {
  const [audits, setAudits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  // 📌 Fetch Recent Audits from Backend
  useEffect(() => {
    const fetchAudits = async () => {
      try {
        const { data } = await axios.get("/api/audits?limit=5");
        setAudits(data);
      } catch (error) {
        setNotification({ type: "error", message: "Failed to fetch audits." });
      } finally {
        setLoading(false);
      }
    };

    fetchAudits();
  }, []);

  return (
    <div className="recent-audits">
      <h2>Recent Audits</h2>

      {notification && <Notification type={notification.type} message={notification.message} />}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <ul className="audit-list">
          {audits.length === 0 ? (
            <li>No recent audits available.</li>
          ) : (
            audits.map((audit) => (
              <li key={audit._id} className={`audit-item ${audit.securityScore < 50 ? "high-risk" : "safe"}`}>
                <strong>{audit.contractName}</strong> - Security Score: {audit.securityScore}/100
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default RecentAudits;
