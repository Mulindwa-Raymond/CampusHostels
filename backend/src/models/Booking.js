import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    hostel: { type: mongoose.Schema.Types.ObjectId, ref: "Hostel", required: true },
    room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, enum: ["active", "cancelled"], default: "active" },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking; // ✅ Must be default for your current import
