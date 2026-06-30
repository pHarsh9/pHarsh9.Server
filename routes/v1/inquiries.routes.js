import express from "express";
const router = express.Router();
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import {
  createInquiry,
  listAllInquiries,
  deleteInquiry,
  listInquiriesByParams,
} from "../../controllers/v1/inquiryMaster.controller.js";

// Public route to submit contact inquiries
router.post("/portfolio/inquiries", createInquiry);

// Admin-only routes to view/manage inquiries
router.get("/portfolio/inquiries", authMiddleware(["ADMIN"]), listAllInquiries);
router.delete("/portfolio/inquiries/:inquiryId", authMiddleware(["ADMIN"]), deleteInquiry);
router.post("/portfolio/inquiries/search", authMiddleware(["ADMIN"]), listInquiriesByParams);

export default router;
