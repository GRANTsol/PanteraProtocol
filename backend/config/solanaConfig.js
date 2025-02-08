import { Connection, clusterApiUrl } from "@solana/web3.js";

// Use Jito RPC for faster transaction processing
const SOLANA_RPC_URL = process.env.SOLANA_RPC_URL || "https://jito.rpcpool.com";

// Create a Solana connection instance
const solanaConnection = new Connection(SOLANA_RPC_URL, "confirmed");

console.log(`✅ Solana RPC Connected: ${SOLANA_RPC_URL}`);

export default solanaConnection;
