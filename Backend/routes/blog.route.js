import express from "express";
import { createBlog, deleteBlog, getAllBlogs, getMyBlogs, getSingleBlogs, updateBlog, uploadImage, getCreatorProfile} from "../controller/blog.controller.js";
import { isAdmin, isAuthenticated } from "../middleware/authUser.js";

const router = express.Router();

router.post("/create", isAuthenticated, isAdmin("admin"), createBlog);
router.delete("/delete/:id", isAuthenticated, isAdmin("admin"), deleteBlog);
router.get("/all-blogs", getAllBlogs);
router.get("/single-blog/:id", isAuthenticated, getSingleBlogs);
router.get("/my-blog", isAuthenticated, isAdmin("admin"), getMyBlogs);
router.put("/update/:id", isAuthenticated, isAdmin("admin"), updateBlog);
router.post("/upload-image", isAuthenticated, isAdmin("admin"), uploadImage);
router.get("/creator/:creatorId", isAuthenticated, getCreatorProfile);


export default router;