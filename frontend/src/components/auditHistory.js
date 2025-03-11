import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";
import Notification from "./Notification";

const AuditHistory = ({ contractId }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  // 📌 Fetch Audit History for a Specific Contract
  useEffect(() => {
    if (!contractId) return;

    const fetchHistory = async () => {
      try {
        const { data } = await axios.get(`/api/audits/history/${contractId}`);
        setHistory(data);
      } catch (error) {
        setNotification({ type: "error", message: "Failed to fetch audit history." });
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [contractId]);

  return (
    <div className="audit-history">
      <h2>Audit History</h2>

      {notification && <Notification type={notification.type} message={notification.message} />}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Security Score</th>
              <th>Issues Found</th>
            </tr>
          </thead>
          <tbody>
            {history.length === 0 ? (
              <tr>
                <td colSpan="3">No previous audits found.</td>
              </tr>
            ) : (
              history.map((audit) => (
                <tr key={audit._id}>
                  <td>{new Date(audit.timestamp).toLocaleString()}</td>
                  <td>{audit.securityScore}/100</td>
                  <td>{audit.detectedIssues.length} issues</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AuditHistory;
