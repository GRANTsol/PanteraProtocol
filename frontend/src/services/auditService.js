import api from "./api";

// 📌 Submit Smart Contract for AI Audit
export const submitAudit = async (contractCode) => {
  try {
    const { data } = await api.post("/api/audits", { contractCode });
    return data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to submit audit.";
  }
};

// 📌 Fetch All Audits
export const getAllAudits = async () => {
  try {
    const { data } = await api.get("/api/audits");
    return data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to load audits.";
  }
};

// 📌 Fetch Single Audit by ID
export const getAuditById = async (auditId) => {
  try {
    const { data } = await api.get(`/api/audits/${auditId}`);
    return data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to load audit details.";
  }
};
