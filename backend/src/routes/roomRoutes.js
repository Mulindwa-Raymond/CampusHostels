import express from "express";
import {
  createRoom,
  getRoomsByHostel,
  updateRoom,
  deleteRoom,
} from "../controllers/roomController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createRoom); // Admin only
router.get("/:hostelId", getRoomsByHostel);
router.put("/:id", protect, updateRoom); // Admin only
router.delete("/:id", protect, deleteRoom); // Admin only

export default router;
