import Student from "../models/Student.js";
import bcrypt from "bcryptjs";

// Get all students
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().select("-password"); // exclude passwords
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get a student by ID
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).select("-password");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update student
export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const { name, email, phone, password } = req.body;

    if (name) student.name = name;
    if (email) student.email = email;
    if (phone) student.phone = phone;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      student.password = hashedPassword;
    }

    await student.save();
    res.status(200).json({ message: "Student updated successfully", student });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
