import jwt from "jsonwebtoken";
import Student from "../models/Student.js";

// Protect routes - verify JWT token
export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token without password
      req.user = await Student.findById(decoded.id).select("-password");

      next(); // proceed to next middleware/controller
    } catch (err) {
      console.error(err);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};
