import express from "express";
import {
  auditSmartContract,
  getAllAudits,
  getAuditById,
  analyzeSolanaTransaction,
  monitorSmartContract,
} from "../controllers/auditController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// 📌 Submit a Smart Contract for AI-Powered Audit
router.post("/", protect, auditSmartContract);

// 📌 Get All Audits (Admin Only)
router.get("/", protect, isAdmin, getAllAudits);

// 📌 Get a Specific Audit by ID
router.get("/:id", protect, getAuditById);

// 📌 AI-Powered Risk Analysis for Solana Transactions
router.post("/analyze-transaction", protect, analyzeSolanaTransaction);

// 📌 Monitor Smart Contract Execution on Solana
router.post("/monitor-contract", protect, monitorSmartContract);

export default router;
