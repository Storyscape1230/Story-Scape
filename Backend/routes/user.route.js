import express from "express";
import { getAdmins, getMyProfile, login, logout, register, updateProfile } from "../controller/user.controller.js";
import { isAuthenticated } from "../middleware/authUser.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/my-profile", isAuthenticated, getMyProfile);
router.put("/update-profile", isAuthenticated, updateProfile);
router.get("/admins", getAdmins); // ✅ Fixed import issue

export default router;
