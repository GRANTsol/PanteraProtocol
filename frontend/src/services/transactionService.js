import api from "./api";

// 📌 Analyze Solana Transaction for Security Risks
export const analyzeTransaction = async (transactionSignature) => {
  try {
    const { data } = await api.post("/api/solana/analyze-transaction", { signature: transactionSignature });
    return data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to analyze transaction.";
  }
};
