import express from "express";
import { getProfile, updateProfile } from "../../controllers/v1/profileMaster.controller.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/portfolio/profile", getProfile);
router.put("/portfolio/profile", authMiddleware(["ADMIN"]), updateProfile);

export default router;
