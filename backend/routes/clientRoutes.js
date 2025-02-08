import express from "express";
import {
  createClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient,
} from "../controllers/clientController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// 📌 Create a New Client (Admin Only)
router.post("/", protect, isAdmin, createClient);

// 📌 Get All Clients (Admin Only)
router.get("/", protect, isAdmin, getClients);

// 📌 Get Client by ID
router.get("/:id", protect, getClientById);

// 📌 Update Client Information (Admin Only)
router.put("/:id", protect, isAdmin, updateClient);

// 📌 Delete Client (Admin Only)
router.delete("/:id", protect, isAdmin, deleteClient);

export default router;
