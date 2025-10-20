import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import app from "./src/app.js";

dotenv.config();

// Connect to MongoDB Atlas
connectDB();

// Default route
app.get("/", (req, res) => {
  res.send("🎉 Hostel Booking System API is running!");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server Error", error: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
