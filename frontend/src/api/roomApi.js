import axios from "axios";

// Get all rooms
export const getAllRooms = async () => {
  const response = await axios.get(`/rooms`);
  return response.data;
};

// Get room by ID
export const getRoomById = async (id) => {
  const response = await axios.get(`/rooms/${id}`);
  return response.data;
};

// Get all rooms for a specific hostel
export const getRoomsByHostel = async (hostelId) => {
  const response = await axios.get(`/rooms/hostel/${hostelId}`);
  return response.data;
};

// Create room (admin only)
export const createRoom = async (roomData, token) => {
  const response = await axios.post(`/rooms`, roomData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Update room (admin only)
export const updateRoom = async (id, roomData, token) => {
  const response = await axios.put(`/rooms/${id}`, roomData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Delete room (admin only)
export const deleteRoom = async (id, token) => {
  const response = await axios.delete(`/rooms/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
