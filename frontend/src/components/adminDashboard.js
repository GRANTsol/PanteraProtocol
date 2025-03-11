import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";
import Notification from "./Notification";
import "./AdminDashboard.css"; // Include a CSS file for styling

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAudits: 0,
    recentAudits: [],
  });

  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  // 📌 Fetch Admin Dashboard Data
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get("/api/admin/stats");
        setStats(data);
      } catch (error) {
        setNotification({ type: "error", message: "Failed to load dashboard data." });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      {notification && <Notification type={notification.type} message={notification.message} />}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <div className="stats-container">
            <div className="stat-box">
              <h3>{stats.totalUsers}</h3>
              <p>Registered Users</p>
              <i className="fas fa-users"></i> {/* User icon */}
            </div>

            <div className="stat-box">
              <h3>{stats.totalAudits}</h3>
              <p>Total Audits Conducted</p>
              <i className="fas fa-file-code"></i> {/* Audit icon */}
            </div>
          </div>

          <h3>Recent Audits</h3>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>User</th>
                <th>Security Score</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentAudits.length === 0 ? (
                <tr>
                  <td colSpan="3">No recent audits.</td>
                </tr>
              ) : (
                stats.recentAudits.map((audit) => (
                  <tr key={audit._id}>
                    <td>{new Date(audit.date).toLocaleDateString()}</td>
                    <td>{audit.userEmail}</td>
                    <td>{audit.securityScore}/100</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
