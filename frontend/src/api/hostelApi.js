import axios from "axios";

// Get all hostels
export const getAllHostels = async () => {
  const response = await axios.get(`/hostels`);
  return response.data;
};

// Get single hostel by ID
export const getHostelById = async (id) => {
  const response = await axios.get(`/hostels/${id}`);
  return response.data;
};

// Create a new hostel (admin only)
export const createHostel = async (hostelData, token) => {
  const response = await axios.post(`/hostels`, hostelData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Update hostel (admin only)
export const updateHostel = async (id, hostelData, token) => {
  const response = await axios.put(`/hostels/${id}`, hostelData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Delete hostel (admin only)
export const deleteHostel = async (id, token) => {
  const response = await axios.delete(`/hostels/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
