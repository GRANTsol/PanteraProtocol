import React, { createContext, useEffect } from "react";
import { io } from "socket.io-client";
import { useContext } from "react";
import AuditContext from "./AuditContext";

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const { updateAudit } = useContext(AuditContext);
  const socket = io("http://localhost:5000"); // Change to backend URL if deployed

  useEffect(() => {
    console.log("📡 Connecting to WebSocket server...");

    // 📌 Listen for audit status updates
    socket.on("auditStatusUpdate", (updatedAudit) => {
      console.log("🔄 Audit Status Update Received:", updatedAudit);
      updateAudit(updatedAudit);
    });

    // Cleanup WebSocket connection on unmount
    return () => {
      socket.disconnect();
      console.log("❌ Disconnected from WebSocket server.");
    };
  }, [updateAudit]);

  return <WebSocketContext.Provider value={socket}>{children}</WebSocketContext.Provider>;
};

export default WebSocketContext;
