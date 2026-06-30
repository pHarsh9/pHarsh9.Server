import express from "express";
const router = express.Router();
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import {
  createProject,
  listAllProjects,
  updateProject,
  deleteProject,
  getProjectById,
  getProjectBySlug,
  listProjectsByParams,
} from "../../controllers/v1/projectMaster.controller.js";
import { createSecureImageUpload } from "../../middlewares/secureUpload.js";

const secureProjectImageUpload = createSecureImageUpload({
  destination: "uploads/projects",
  fieldName: "image",
  maxSize: 5 * 1024 * 1024, // 5MB
  compress: true,
  quality: 85,
});

// Public routes for frontend
router.get("/portfolio/projects", listAllProjects);
router.get("/portfolio/projects/slug/:slug", getProjectBySlug);
router.get("/portfolio/projects/:projectId", getProjectById);

// Admin-only routes
router.post("/portfolio/projects", authMiddleware(["ADMIN"]), createProject);
router.put("/portfolio/projects/:projectId", authMiddleware(["ADMIN"]), updateProject);
router.delete("/portfolio/projects/:projectId", authMiddleware(["ADMIN"]), deleteProject);
router.post("/portfolio/projects/search", authMiddleware(["ADMIN"]), listProjectsByParams);
router.post(
  "/portfolio/projects/upload",
  authMiddleware(["ADMIN"]),
  secureProjectImageUpload,
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ isOk: false, message: "No file uploaded" });
    }
    const imageUrl = `/uploads/projects/${req.file.filename}`;
    res.status(200).json({ isOk: true, url: imageUrl });
  }
);

export default router;
