import express from "express";
import {
  getSolanaTransaction,
  analyzeSolanaTransaction,
  monitorSmartContract,
} from "../controllers/solanaController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// 📌 Fetch Solana Transaction Details
router.get("/transaction/:signature", protect, getSolanaTransaction);

// 📌 AI-Powered Risk Analysis for Solana Transactions
router.post("/analyze-transaction", protect, analyzeSolanaTransaction);

// 📌 Monitor Smart Contract Execution on Solana
router.post("/monitor-contract", protect, monitorSmartContract);

export default router;
