import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import UserModel from "../models/UserModel.js";

// 📌 Middleware to Protect Routes (Require Auth)
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Verify JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user data (excluding password) to the request
      req.user = await UserModel.findById(decoded.id).select("-password");

      if (!req.user) {
        res.status(401);
        throw new Error("User not found");
      }

      next();
    } catch (error) {
      console.error(`Auth Error: ${error.message}`);
      res.status(401);
      throw new Error("Not authorized, invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token provided");
  }
});

// 📌 Middleware for Admin-Only Routes
export const isAdmin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403);
    throw new Error("Access denied. Admins only");
  }
});

// 📌 Middleware for Master Admin-Only Routes
export const isMasterAdmin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isMaster) {
    next();
  } else {
    res.status(403);
    throw new Error("Access denied. Only Master Admins can perform this action");
  }
});
