import express from "express";
import cors from "cors";
const app = express();
import authRoutes from "./routes/authRoutes.js";
import hostelRoutes from "./routes/hostelRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import connectDB from './config/db.js'

app.use(cors());

const PORT = 5001;
app.use(express.json());

// Routes imports


// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/hostels", hostelRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);

app.listen(PORT, async() => {
  console.log("Server is running on port 5000");
  await connectDB;
});

export default app;