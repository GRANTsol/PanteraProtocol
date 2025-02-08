import asyncHandler from "express-async-handler";
import AuditModel from "../models/AuditModel.js";
import aiAgent from "../utils/aiAgent.js";
import solanaUtils from "../utils/solanaUtils.js";

// 📌 AI-Powered Smart Contract Audit
export const auditSmartContract = asyncHandler(async (req, res) => {
  const { contractCode, clientId } = req.body;

  if (!contractCode || !clientId) {
    res.status(400);
    throw new Error("Missing contract code or client ID");
  }

  try {
    // AI Agent analyzes smart contract for vulnerabilities
    const auditResult = await aiAgent.analyzeCode(contractCode);

    // Store audit results in database
    const audit = new AuditModel({
      clientId,
      contractCode,
      auditResult,
    });

    const savedAudit = await audit.save();

    res.status(201).json({
      message: "Audit completed successfully",
      auditId: savedAudit._id,
      auditResult,
    });
  } catch (error) {
    console.error(`Audit Error: ${error.message}`);
    res.status(500);
    throw new Error("Error processing audit");
  }
});

// 📌 Fetch All Audits
export const getAllAudits = asyncHandler(async (req, res) => {
  const audits = await AuditModel.find({});
  res.json(audits);
});

// 📌 Get Single Audit by ID
export const getAuditById = asyncHandler(async (req, res) => {
  const audit = await AuditModel.findById(req.params.id);

  if (audit) {
    res.json(audit);
  } else {
    res.status(404);
    throw new Error("Audit not found");
  }
});

// 📌 Run AI-Driven Risk Analysis on Solana Transactions
export const analyzeSolanaTransaction = asyncHandler(async (req, res) => {
  const { transactionSignature } = req.body;

  if (!transactionSignature) {
    res.status(400);
    throw new Error("Missing transaction signature");
  }

  try {
    // Fetch transaction details from Solana blockchain
    const transactionDetails = await solanaUtils.getTransaction(transactionSignature);

    if (!transactionDetails) {
      res.status(404);
      throw new Error("Transaction not found");
    }

    // AI-powered security analysis
    const analysis = await aiAgent.analyzeTransaction(transactionDetails);

    res.status(200).json({
      message: "Transaction analysis complete",
      transactionSignature,
      analysis,
    });
  } catch (error) {
    console.error(`Solana Transaction Analysis Error: ${error.message}`);
    res.status(500);
    throw new Error("Error analyzing transaction");
  }
});
