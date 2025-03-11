import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";
import Notification from "./Notification";

const ActivityLog = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  // 📌 Fetch Activity Log from Backend
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const { data } = await axios.get("/api/activity");
        setLogs(data);
      } catch (error) {
        setNotification({ type: "error", message: "Failed to fetch activity log." });
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="activity-log">
      <h2>Recent Activity</h2>

      {notification && <Notification type={notification.type} message={notification.message} />}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <ul className="log-list">
          {logs.length === 0 ? (
            <li>No recent activity.</li>
          ) : (
            logs.map((log, index) => (
              <li key={index} className="log-item">
                <strong>{log.user}</strong> {log.action} <em>{log.timestamp}</em>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default ActivityLog;
