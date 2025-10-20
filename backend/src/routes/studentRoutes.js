import express from "express";
import {
  getAllStudents,
  getStudentById,
  updateStudent,
} from "../controllers/studentController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getAllStudents); // Admin only
router.get("/:id", protect, getStudentById);
router.put("/:id", protect, updateStudent);

export default router;
