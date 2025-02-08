import { Connection, PublicKey } from "@solana/web3.js";

// 📌 Connect to Solana RPC (Jito RPC for faster transaction processing)
const SOLANA_RPC_URL = process.env.SOLANA_RPC_URL || "https://jito.rpcpool.com";
const connection = new Connection(SOLANA_RPC_URL, "confirmed");

// 📌 Fetch Solana Transaction Details
export const getTransaction = async (signature) => {
  try {
    const transaction = await connection.getTransaction(signature, {
      commitment: "confirmed",
    });

    if (!transaction) {
      throw new Error("Transaction not found on Solana");
    }

    return transaction;
  } catch (error) {
    console.error(`Error fetching transaction: ${error.message}`);
    throw new Error("Failed to retrieve Solana transaction");
  }
};

// 📌 Fetch Smart Contract Execution History
export const getContractExecutions = async (contractAddress) => {
  try {
    const publicKey = new PublicKey(contractAddress);
    const signatures = await connection.getSignaturesForAddress(publicKey, {
      limit: 10, // Fetch last 10 transactions for monitoring
    });

    const transactions = [];
    for (const sig of signatures) {
      const tx = await getTransaction(sig.signature);
      if (tx) transactions.push(tx);
    }

    return transactions;
  } catch (error) {
    console.error(`Error fetching contract executions: ${error.message}`);
    throw new Error("Failed to retrieve contract execution history");
  }
};

export default {
  getTransaction,
  getContractExecutions,
};
