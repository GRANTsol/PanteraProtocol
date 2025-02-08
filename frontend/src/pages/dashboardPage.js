import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardStats from "../components/DashboardStats";
import LoadingSpinner from "../components/LoadingSpinner";
import Notification from "../components/Notification";
import "./DashboardPage.css"; // Import CSS for styling

const DashboardPage = () => {
  const [recentAudits, setRecentAudits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  // 📌 Fetch Recent Audits from Backend
  useEffect(() => {
    const fetchAudits = async () => {
      try {
        const { data } = await axios.get("/api/audits");
        setRecentAudits(data.slice(0, 5)); // Get the 5 most recent audits
      } catch (error) {
        setNotification({ type: "error", message: "Failed to load recent audits." });
      } finally {
        setLoading(false);
      }
    };

    fetchAudits();
  }, []);

  return (
    <div className="dashboard-page">
      <h1>📊 Dashboard</h1>

      {notification && <Notification type={notification.type} message={notification.message} />}

      <DashboardStats /> {/* Audit statistics section */}

      <h2>Recent Audit Reports</h2>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="recent-audits">
          {recentAudits.length === 0 ? (
            <p>No recent audits found.</p>
          ) : (
            <ul>
              {recentAudits.map((audit) => (
                <li key={audit._id} className={audit.securityScore < 50 ? "high-risk" : ""}>
                  <strong>Audit ID:</strong> {audit._id} | <strong>Security Score:</strong> {audit.securityScore}/100
                  <br />
                  <strong>Status:</strong> {audit.auditStatus}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
