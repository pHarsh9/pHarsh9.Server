import express from "express";
const router = express.Router();
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import {
  createSkill,
  listAllSkills,
  updateSkill,
  deleteSkill,
  getSkillById,
  listSkillsByParams,
} from "../../controllers/v1/skillMaster.controller.js";

// Public routes for frontend
router.get("/portfolio/skills", listAllSkills);
router.get("/portfolio/skills/:skillId", getSkillById);

// Admin-only routes
router.post("/portfolio/skills", authMiddleware(["ADMIN"]), createSkill);
router.put("/portfolio/skills/:skillId", authMiddleware(["ADMIN"]), updateSkill);
router.delete("/portfolio/skills/:skillId", authMiddleware(["ADMIN"]), deleteSkill);
router.post("/portfolio/skills/search", authMiddleware(["ADMIN"]), listSkillsByParams);

export default router;
