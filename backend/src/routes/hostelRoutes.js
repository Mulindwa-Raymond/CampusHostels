import express from "express";
import {
  createHostel,
  getAllHostels,
  getHostelById,
  updateHostel,
  deleteHostel,
} from "../controllers/hostelController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createHostel); // Admin only
router.get("/", getAllHostels);
router.get("/:id", getHostelById);
router.put("/:id", protect, updateHostel); // Admin only
router.delete("/:id", protect, deleteHostel); // Admin only

export default router;
