import mongoose from "mongoose";

const auditSchema = mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    contractCode: {
      type: String,
      required: true,
    },
    auditResult: {
      type: Object,
      required: true,
    },
    securityScore: {
      type: Number,
      required: true,
      default: 0, // AI assigns score based on vulnerabilities found
    },
    detectedIssues: {
      type: [String], // List of security vulnerabilities detected
      default: [],
    },
    blockchain: {
      type: String,
      required: true,
      default: "Solana", // Since Pantera Protocol focuses on Solana
    },
    auditStatus: {
      type: String,
      enum: ["Pending", "Completed", "Failed"],
      default: "Pending",
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps automatically
  }
);

const Audit = mongoose.model("Audit", auditSchema);
export default Audit;
