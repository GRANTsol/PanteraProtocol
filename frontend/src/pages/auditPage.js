import React, { useState, useEffect } from "react";
import axios from "axios";
import AuditForm from "../components/AuditForm";
import Notification from "../components/Notification";
import LoadingSpinner from "../components/LoadingSpinner";
import "./AuditPage.css"; // Import CSS for styling

const AuditPage = () => {
  const [audits, setAudits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  // 📌 Fetch Past Audits from Backend
  useEffect(() => {
    const fetchAudits = async () => {
      try {
        const { data } = await axios.get("/api/audits");
        setAudits(data);
      } catch (error) {
        setNotification({ type: "error", message: "Failed to load audit reports." });
      } finally {
        setLoading(false);
      }
    };

    fetchAudits();
  }, []);

  return (
    <div className="audit-page">
      <h1>🔍 Smart Contract Audits</h1>

      {notification && <Notification type={notification.type} message={notification.message} />}

      <AuditForm /> {/* Contract submission form */}

      <h2>Past Audit Reports</h2>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="audit-reports">
          {audits.length === 0 ? (
            <p>No audit reports found.</p>
          ) : (
            <ul>
              {audits.map((audit) => (
                <li key={audit._id} className={audit.securityScore < 50 ? "high-risk" : ""}>
                  <strong>Audit ID:</strong> {audit._id} | <strong>Security Score:</strong> {audit.securityScore}/100
                  <br />
                  <strong>Status:</strong> {audit.auditStatus}
                  <br />
                  <strong>Detected Issues:</strong> {audit.detectedIssues.length > 0 ? audit.detectedIssues.join(", ") : "None"}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default AuditPage;
