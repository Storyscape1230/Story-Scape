import express from "express";
import {
  getAdmins,
  getMyProfile,
  login,
  logout,
  register,
  updateProfile,
} from "../controller/user.controller.js";
import { isAuthenticated, isAdmin } from "../middleware/authUser.js";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes (require authentication)
router.get("/logout", isAuthenticated, logout);
router.get("/my-profile", isAuthenticated, getMyProfile);
router.put("/update-profile", isAuthenticated, updateProfile);

// Admin-only routes
router.get("/admins", isAuthenticated, getAdmins);

export default router;