import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuditContext = createContext();

export const AuditProvider = ({ children }) => {
  const [audits, setAudits] = useState([]);
  const [loading, setLoading] = useState(true);

  // 📌 Fetch all audits from backend
  useEffect(() => {
    const fetchAudits = async () => {
      try {
        const { data } = await axios.get("/api/audits");
        setAudits(data);
      } catch (error) {
        console.error("Error fetching audits:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAudits();
  }, []);

  // 📌 Add new audit after submission
  const addAudit = (newAudit) => {
    setAudits((prevAudits) => [newAudit, ...prevAudits]);
  };

  // 📌 Update audit status in real-time (WebSocket integration)
  const updateAudit = (updatedAudit) => {
    setAudits((prevAudits) =>
      prevAudits.map((audit) => (audit._id === updatedAudit._id ? updatedAudit : audit))
    );
  };

  return (
    <AuditContext.Provider value={{ audits, loading, addAudit, updateAudit }}>
      {children}
    </AuditContext.Provider>
  );
};

export default AuditContext;
