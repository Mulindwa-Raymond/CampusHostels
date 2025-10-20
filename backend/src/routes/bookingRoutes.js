import express from "express";
import {
  createBooking,
  cancelBooking,
  getBookingsByStudent,
  getAllBookings
} from "../controllers/bookingController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Create a booking (student)
router.post("/", protect, authorizeRoles("student"), createBooking);

// Cancel a booking (student)
router.put("/cancel/:id", protect, authorizeRoles("student"), cancelBooking);

// Get student bookings
router.get("/student/:studentId", protect, authorizeRoles("student", "admin"), getBookingsByStudent);

// Admin: Get all bookings
router.get("/", protect, authorizeRoles("admin"), getAllBookings);

export default router;
