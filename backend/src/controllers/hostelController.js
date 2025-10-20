import Hostel from "../models/Hostel.js";

export const createHostel = async (req, res) => {
  try {
    const hostel = await Hostel.create(req.body);
    res.status(201).json(hostel);
  } catch (error) {
    res.status(500).json({ message: "Error creating hostel", error });
  }
};

export const getAllHostels = async (req, res) => {
  try {
    const hostels = await Hostel.find();
    res.status(200).json(hostels);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hostels", error });
  }
};

export const getHostelById = async (req, res) => {
  try {
    const hostel = await Hostel.findById(req.params.id);
    if (!hostel) {
      return res.status(404).json({ message: "Hostel not found" });
    }
    res.status(200).json(hostel);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hostel", error });
  }
};

export const updateHostel = async (req, res) => {
  try {
    const hostel = await Hostel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(hostel);
  } catch (error) {
    res.status(500).json({ message: "Error updating hostel", error });
  }
};

export const deleteHostel = async (req, res) => {
  try {
    await Hostel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Hostel deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting hostel", error });
  }
};
