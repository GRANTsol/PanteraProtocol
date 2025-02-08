import React, { useState } from "react";
import axios from "axios";
import Notification from "../components/Notification";
import LoadingSpinner from "../components/LoadingSpinner";
import "./TransactionPage.css"; // Import CSS for styling

const TransactionPage = () => {
  const [transactionSignature, setTransactionSignature] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  // 📌 Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!transactionSignature) {
      setNotification({ type: "error", message: "Please enter a transaction signature." });
      return;
    }

    setLoading(true);
    setNotification(null);

    try {
      const { data } = await axios.post("/api/solana/analyze-transaction", {
        signature: transactionSignature,
      });

      setAnalysisResult(data.analysis);
      setNotification({ type: "success", message: "Transaction analysis completed!" });
    } catch (error) {
      setNotification({ type: "error", message: "Failed to analyze transaction. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="transaction-page">
      <h1>💳 Solana Transaction Analysis</h1>

      {notification && <Notification type={notification.type} message={notification.message} />}

      <form onSubmit={handleSubmit}>
        <label>Enter Transaction Signature:</label>
        <input
          type="text"
          value={transactionSignature}
          onChange={(e) => setTransactionSignature(e.target.value)}
          placeholder="Paste Solana transaction signature here..."
        />

        <button type="submit" disabled={loading}>
          {loading ? <LoadingSpinner /> : "Analyze Transaction"}
        </button>
      </form>

      {analysisResult && (
        <div className="analysis-result">
          <h3>Analysis Results:</h3>
          <p><strong>Risk Score:</strong> {analysisResult.riskScore}/100</p>
          <h4>Detected Risks:</h4>
          <ul>
            {analysisResult.detectedRisks.length === 0 ? (
              <li>No security risks detected. ✅</li>
            ) : (
              analysisResult.detectedRisks.map((risk, index) => <li key={index}>⚠️ {risk}</li>)
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TransactionPage;
