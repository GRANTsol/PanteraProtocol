import express from "express";
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
} from "../controllers/authController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// 📌 Register a New User
router.post("/register", registerUser);

// 📌 Authenticate & Get Token (Login)
router.post("/login", authUser);

// 📌 Get Logged-In User Profile
router.get("/profile", protect, getUserProfile);

// 📌 Update User Profile
router.put("/profile", protect, updateUserProfile);

// 📌 Get All Users (Admin Only)
router.get("/", protect, isAdmin, getAllUsers);

export default router;
