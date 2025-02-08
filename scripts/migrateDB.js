#!/usr/bin/env node

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

// Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
    process.exit(1);
  }
};

// Define Collections & Indexes
const migrateDatabase = async () => {
  try {
    const db = mongoose.connection;

    // Ensure indexes for Users Collection
    await db.collection("users").createIndex({ email: 1 }, { unique: true });
    console.log("📌 Created Index: users.email (unique)");

    // Ensure indexes for Audits Collection
    await db.collection("audits").createIndex({ contractId: 1 }, { unique: true });
    console.log("📌 Created Index: audits.contractId (unique)");

    // Ensure indexes for Solana Transactions Collection
    await db.collection("solanaTransactions").createIndex({ signature: 1 }, { unique: true });
    console.log("📌 Created Index: solanaTransactions.signature (unique)");

    console.log("✅ Database Migration Completed Successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Database Migration Failed:", error);
    process.exit(1);
  }
};

// Run the migration script
const runMigration = async () => {
  await connectDB();
  await migrateDatabase();
};

runMigration();
