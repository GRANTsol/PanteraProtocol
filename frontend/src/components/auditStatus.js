import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import LoadingSpinner from "./LoadingSpinner";
import Notification from "./Notification";

const socket = io("http://localhost:5000"); // Change to backend URL if deployed

const AuditStatus = ({ auditId }) => {
  const [status, setStatus] = useState("Pending");
  const [issues, setIssues] = useState([]);
  const [securityScore, setSecurityScore] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (!auditId) return;

    // 📌 Listen for real-time audit status updates
    socket.emit("requestAuditStatus", auditId);
    
    socket.on("auditStatusUpdate", (data) => {
      if (data.auditId === auditId) {
        setStatus(data.status);
        setSecurityScore(data.securityScore);
        setIssues(data.detectedIssues || []);
        
        setNotification({
          type: data.status === "Completed" ? "success" : "info",
          message: `Audit status updated: ${data.status}`,
        });
      }
    });

    // Cleanup WebSocket connection
    return () => {
      socket.off("auditStatusUpdate");
    };
  }, [auditId]);

  return (
    <div className="audit-status">
      <h2>Audit Status</h2>

      {notification && <Notification type={notification.type} message={notification.message} />}

      <p><strong>Status:</strong> {status}</p>

      {status === "In Progress" && <LoadingSpinner />}

      {status === "Completed" && (
        <div className="audit-results">
          <h3>Audit Results:</h3>
          <p><strong>Security Score:</strong> {securityScore}/100</p>
          <h4>Detected Issues:</h4>
          <ul>
            {issues.length === 0 ? (
              <li>No security issues found. ✅</li>
            ) : (
              issues.map((issue, index) => <li key={index}>⚠️ {issue}</li>)
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AuditStatus;
