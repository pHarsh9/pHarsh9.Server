import express from "express";
const router = Router();
import { Router } from "express"; // router fix
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import {
  createExperience,
  listAllExperiences,
  updateExperience,
  deleteExperience,
  getExperienceById,
  listExperiencesByParams,
} from "../../controllers/v1/experienceMaster.controller.js";

const r = express.Router();

// Public routes for frontend
r.get("/portfolio/experiences", listAllExperiences);
r.get("/portfolio/experiences/:experienceId", getExperienceById);

// Admin-only routes
r.post("/portfolio/experiences", authMiddleware(["ADMIN"]), createExperience);
r.put("/portfolio/experiences/:experienceId", authMiddleware(["ADMIN"]), updateExperience);
r.delete("/portfolio/experiences/:experienceId", authMiddleware(["ADMIN"]), deleteExperience);
r.post("/portfolio/experiences/search", authMiddleware(["ADMIN"]), listExperiencesByParams);

export default r;
