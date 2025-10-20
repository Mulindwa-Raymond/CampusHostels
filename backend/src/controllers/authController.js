import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register Student
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, studentID, phone, gender, university, location, role } = req.body;

    // Check if email already exists
    const existingStudent = await User.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      studentID,
      phone,
      gender,
      university,
      location,
      role: role || "student",
    });

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Login Student
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if student exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
