import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";
import Notification from "./Notification";
import "./DashboardStats.css"; // Import CSS for styling

const DashboardStats = () => {
  const [stats, setStats] = useState({
    totalAudits: 0,
    highRiskAudits: 0,
    averageSecurityScore: 0,
  });

  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  // 📌 Fetch Audit Statistics from Backend
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get("/api/audits");

        const totalAudits = data.length;
        const highRiskAudits = data.filter((audit) => audit.securityScore < 50).length;
        const averageSecurityScore =
          totalAudits > 0
            ? data.reduce((sum, audit) => sum + audit.securityScore, 0) / totalAudits
            : 0;

        setStats({ totalAudits, highRiskAudits, averageSecurityScore });
      } catch (error) {
        setNotification({ type: "error", message: "Failed to load audit statistics." });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="dashboard-stats">
      <h2>Audit Overview</h2>

      {notification && <Notification type={notification.type} message={notification.message} />}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="stats-container">
          <div className="stat-box">
            <h3>{stats.totalAudits}</h3>
            <p>Total Audits</p>
            <i className="fas fa-file-alt"></i> {/* Audit icon */}
          </div>

          <div className="stat-box high-risk">
            <h3>{stats.highRiskAudits}</h3>
            <p>High-Risk Audits</p>
            <i className="fas fa-exclamation-triangle"></i> {/* Warning icon */}
          </div>

          <div className="stat-box">
            <h3>{stats.averageSecurityScore.toFixed(1)}/100</h3>
            <p>Avg. Security Score</p>
            <i className="fas fa-shield-alt"></i> {/* Security icon */}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardStats;
