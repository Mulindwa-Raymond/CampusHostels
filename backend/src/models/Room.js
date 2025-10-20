import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    hostel: { type: mongoose.Schema.Types.ObjectId, ref: "Hostel", required: true },
    roomNumber: { type: String, required: true },
    capacity: { type: Number, default: 1 },
    occupied: { type: Number, default: 0 },
    genderType: { type: String, enum: ["Male", "Female", "Any"], default: "Any" },
    price: { type: Number },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Room", roomSchema);
