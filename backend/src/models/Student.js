import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    studentID: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
