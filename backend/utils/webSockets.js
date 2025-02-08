import { Server } from "socket.io";

let io;

// 📌 Initialize WebSocket Server
export const initWebSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*", // Allow requests from any frontend
    },
  });

  console.log("✅ WebSocket server initialized");

  io.on("connection", (socket) => {
    console.log(`🔌 New client connected: ${socket.id}`);

    // 📌 Listen for smart contract audit requests
    socket.on("requestAuditStatus", (auditId) => {
      console.log(`📡 Client requested audit status: ${auditId}`);
      // Emit back a response (can be updated dynamically later)
      socket.emit("auditStatusUpdate", { auditId, status: "In Progress" });
    });

    // 📌 Listen for Solana transaction tracking
    socket.on("trackSolanaTransaction", (txSignature) => {
      console.log(`📡 Tracking Solana transaction: ${txSignature}`);
      // Placeholder: Emit dummy transaction update
      socket.emit("solanaTransactionUpdate", { txSignature, status: "Pending Confirmation" });
    });

    // 📌 Handle disconnection
    socket.on("disconnect", () => {
      console.log(`❌ Client disconnected: ${socket.id}`);
    });
  });

  return io;
};

// 📌 Emit Audit Status Updates
export const emitAuditStatus = (auditId, status) => {
  if (io) {
    io.emit("auditStatusUpdate", { auditId, status });
  }
};

// 📌 Emit Solana Transaction Updates
export const emitSolanaTransactionUpdate = (txSignature, status) => {
  if (io) {
    io.emit("solanaTransactionUpdate", { txSignature, status });
  }
};

export default { initWebSocket, emitAuditStatus, emitSolanaTransactionUpdate };
