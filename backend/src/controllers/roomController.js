import Room from "../models/Room.js";

export const createRoom = async (req, res) => {
  try {
    const room = await Room.create(req.body);
    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ message: "Error creating room", error });
  }
};

export const getRoomsByHostel = async (req, res) => {
  try {
    const rooms = await Room.find({ hostel: req.params.hostelId });
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching rooms", error });
  }
};

export const getAvailableRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ hostel: req.params.hostelId, isAvailable: true });
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching available rooms", error });
  }
};

export const updateRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: "Error updating room", error });
  }
};

export const deleteRoom = async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Room deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting room", error });
  }
};
