import React, { useState } from "react";
import axios from "axios";
import Notification from "./Notification";
import LoadingSpinner from "./LoadingSpinner";

const AuditForm = () => {
  const [contractCode, setContractCode] = useState("");
  const [file, setFile] = useState(null);
  const [auditResult, setAuditResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  // 📌 Handle File Upload
  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);

    const reader = new FileReader();
    reader.onload = (event) => {
      setContractCode(event.target.result);
    };
    reader.readAsText(uploadedFile);
  };

  // 📌 Submit Smart Contract for AI Audit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contractCode) {
      setNotification({ type: "error", message: "Please enter or upload a contract." });
      return;
    }

    setLoading(true);
    setNotification(null);

    try {
      const { data } = await axios.post("/api/audits", { contractCode });
      setAuditResult(data.auditResult);
      setNotification({ type: "success", message: "Audit completed successfully!" });
    } catch (error) {
      setNotification({ type: "error", message: "Audit failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="audit-form">
      <h2>Submit Smart Contract for AI Audit</h2>

      {notification && <Notification type={notification.type} message={notification.message} />}

      <form onSubmit={handleSubmit}>
        <label>Paste Contract Code:</label>
        <textarea
          rows="6"
          value={contractCode}
          onChange={(e) => setContractCode(e.target.value)}
          placeholder="Enter your smart contract code..."
        />

        <label>Or Upload a Smart Contract File:</label>
        <input type="file" accept=".sol,.rs,.txt" onChange={handleFileUpload} />

        <button type="submit" disabled={loading}>
          {loading ? <LoadingSpinner /> : "Submit for Audit"}
        </button>
      </form>

      {auditResult && (
        <div className="audit-result">
          <h3>Audit Results:</h3>
          <p><strong>Security Score:</strong> {auditResult.securityScore}/100</p>
          <h4>Detected Issues:</h4>
          <ul>
            {auditResult.detectedIssues.length === 0 ? (
              <li>No security issues found. Your contract is secure! ✅</li>
            ) : (
              auditResult.detectedIssues.map((issue, index) => <li key={index}>⚠️ {issue}</li>)
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AuditForm;
