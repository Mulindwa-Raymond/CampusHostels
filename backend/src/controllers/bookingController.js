import Booking from "../models/Booking.js";

// Create a booking
export const createBooking = async (req, res) => {
  try {
    const { student, hostel, room, startDate, endDate } = req.body;

    const newBooking = await Booking.create({
      student,
      hostel,
      room,
      startDate,
      endDate,
      status: "active",
    });

    res.status(201).json({ message: "Booking created successfully", booking: newBooking });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Cancel a booking
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = "cancelled";
    await booking.save();

    res.status(200).json({ message: "Booking cancelled successfully", booking });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get bookings by student
export const getBookingsByStudent = async (req, res) => {
  try {
    const bookings = await Booking.find({ student: req.params.studentId })
      .populate("hostel")
      .populate("room");

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all bookings (admin)
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("student", "-password")
      .populate("hostel")
      .populate("room");

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
