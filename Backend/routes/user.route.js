import express from "express";
import {
  getAdmins,
  getMyProfile,
  getSavedBlogs,
  login,
  logout,
  register,
  removeSavedBlog,
  saveBlog,
  updateProfile,
  checkSavedStatus,
} from "../controller/user.controller.js";
import { isAuthenticated, isAdmin } from "../middleware/authUser.js";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes (require authentication)
router.get("/logout", logout);
router.get("/my-profile", isAuthenticated, getMyProfile);
router.put("/update-profile", isAuthenticated, updateProfile);
router.put("/save-blog/:blogId", isAuthenticated, saveBlog);
router.get("/saved-blogs", isAuthenticated, getSavedBlogs);
router.get("/check-saved/:blogId", isAuthenticated, checkSavedStatus);
router.delete("/remove-saved/:blogId", isAuthenticated, removeSavedBlog);

// Admin-only routes
router.get("/admins", isAuthenticated, getAdmins);

export default router;