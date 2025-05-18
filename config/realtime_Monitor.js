// realTimeMonitor.js

import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import axios from "axios";

const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");

// Mock function to detect suspicious patterns
function detectRisk(tx) {
  const suspiciousAccounts = ["SomeSuspiciousPublicKey1", "SomeSuspiciousPublicKey2"];
  return tx.transaction.message.accountKeys.some((key) =>
    suspiciousAccounts.includes(key.toString())
  );
}

async function monitorTransactions(limit = 10) {
  try {
    const recentSignatures = await connection.getSignaturesForAddress(
      new PublicKey("YourMonitoredContractPublicKey"),
      { limit }
    );

    for (const sig of recentSignatures) {
      const tx = await connection.getTransaction(sig.signature);
      if (!tx) continue;

      if (detectRisk(tx)) {
        console.log(`⚠️ Risk Detected in Tx: ${sig.signature}`);

        await axios.post("https://your-alert-webhook.com", {
          message: "Risky Solana transaction detected",
          signature: sig.signature,
        });
      }
    }
  } catch (err) {
    console.error("Error monitoring transactions:", err);
  }
}

// Run every minute
setInterval(() => {
  monitorTransactions(5);
}, 60 * 1000);
