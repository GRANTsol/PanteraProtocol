import asyncHandler from "express-async-handler";
import solanaUtils from "../utils/solanaUtils.js";
import aiAgent from "../utils/aiAgent.js";

// 📌 Fetch Solana Transaction Details
export const getSolanaTransaction = asyncHandler(async (req, res) => {
  const { signature } = req.params;

  if (!signature) {
    res.status(400);
    throw new Error("Transaction signature is required");
  }

  try {
    // Fetch transaction details from Solana blockchain
    const transaction = await solanaUtils.getTransaction(signature);

    if (!transaction) {
      res.status(404);
      throw new Error("Transaction not found on Solana");
    }

    res.json(transaction);
  } catch (error) {
    console.error(`Solana Transaction Fetch Error: ${error.message}`);
    res.status(500);
    throw new Error("Error fetching Solana transaction");
  }
});

// 📌 AI-Powered Risk Analysis for Solana Transactions
export const analyzeSolanaTransaction = asyncHandler(async (req, res) => {
  const { signature } = req.body;

  if (!signature) {
    res.status(400);
    throw new Error("Transaction signature is required");
  }

  try {
    // Fetch transaction details from Solana blockchain
    const transactionDetails = await solanaUtils.getTransaction(signature);

    if (!transactionDetails) {
      res.status(404);
      throw new Error("Transaction not found on Solana");
    }

    // AI-powered security analysis
    const riskAnalysis = await aiAgent.analyzeTransaction(transactionDetails);

    res.status(200).json({
      message: "Transaction analysis complete",
      signature,
      riskAnalysis,
    });
  } catch (error) {
    console.error(`Solana Transaction Analysis Error: ${error.message}`);
    res.status(500);
    throw new Error("Error analyzing Solana transaction");
  }
});

// 📌 Monitor Smart Contract Execution on Solana
export const monitorSmartContract = asyncHandler(async (req, res) => {
  const { contractAddress } = req.body;

  if (!contractAddress) {
    res.status(400);
    throw new Error("Smart contract address is required");
  }

  try {
    // Fetch contract execution history from Solana
    const contractExecution = await solanaUtils.getContractExecutions(contractAddress);

    if (!contractExecution) {
      res.status(404);
      throw new Error("No execution data found for this contract");
    }

    res.json(contractExecution);
  } catch (error) {
    console.error(`Smart Contract Monitoring Error: ${error.message}`);
    res.status(500);
    throw new Error("Error monitoring smart contract execution");
  }
});
