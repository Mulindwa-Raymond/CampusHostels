import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    studentID: { type: String },
    phone: { type: String },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    university: { type: String },
    location: { type: String },
    role: { type: String, enum: ["student", "admin"], default: "student" },
  },
  { timestamps: true }
);

// Method to compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Middleware to hash password before saving a new user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
});

export default mongoose.model("User", userSchema);
