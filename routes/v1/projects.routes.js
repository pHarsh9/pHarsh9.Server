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
import { uploadImageToCloud } from "../../config/s3Storage.js";

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

/**
 * ============================================================================
 * 🎓 LESSON 4: PROJECT IMAGE UPLOAD ENDPOINT
 * ============================================================================
 * 1. `authMiddleware(["ADMIN"])`: Protects the upload route (only logged-in admins can upload).
 * 2. `secureProjectImageUpload`: Validates file mime-type, checks file size (<5MB), and compresses image.
 * 3. `uploadImageToCloud(req.file, "projects")`: Uploads to AWS S3 bucket (or local disk if AWS keys missing).
 * ============================================================================
 */
router.post(
  "/portfolio/projects/upload",
  authMiddleware(["ADMIN"]),
  secureProjectImageUpload,
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ isOk: false, message: "No file uploaded" });
      }

      // Upload file to AWS S3 (or fallback to local URL if AWS keys are not set yet)
      const imageUrl = await uploadImageToCloud(req.file, "projects");

      return res.status(200).json({
        isOk: true,
        message: "Project image processed and uploaded successfully",
        url: imageUrl,
      });
    } catch (error) {
      console.error("Error in project upload route:", error);
      return res.status(500).json({ isOk: false, message: "Upload failed: " + error.message });
    }
  }
);

export default router;
