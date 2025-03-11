import React, { useState } from "react";
import axios from "axios";
import Notification from "./Notification";
import LoadingSpinner from "./LoadingSpinner";

const ReportGenerator = ({ auditId }) => {
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  // 📌 Handle Report Generation & Download
  const generateReport = async () => {
    if (!auditId) {
      setNotification({ type: "error", message: "No audit selected for report generation." });
      return;
    }

    setLoading(true);
    setNotification(null);

    try {
      const response = await axios.get(`/api/audits/report/${auditId}`, { responseType: "blob" });

      // Create a Blob URL and trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `audit-report-${auditId}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setNotification({ type: "success", message: "Report downloaded successfully!" });
    } catch (error) {
      setNotification({ type: "error", message: "Failed to generate report." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="report-generator">
      <h2>Download Audit Report</h2>

      {notification && <Notification type={notification.type} message={notification.message} />}

      <button onClick={generateReport} disabled={loading}>
        {loading ? <LoadingSpinner /> : "Generate Report"}
      </button>
    </div>
  );
};

export default ReportGenerator;
