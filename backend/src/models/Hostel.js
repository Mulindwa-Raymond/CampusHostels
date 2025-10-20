import mongoose from "mongoose";

const hostelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    totalRooms: { type: Number, required: true },
    pricePerMonth: { type: Number, required: true },
    facilities: [{ type: String }],
    description: { type: String },
    images: [{ type: String }],
    manager: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Hostel", hostelSchema);
