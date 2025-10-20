import axios from "axios";

// Create a booking (student)
export const createBooking = async (bookingData, token) => {
  const response = await axios.post(`/bookings`, bookingData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Get bookings by student
export const getBookingsByStudent = async (studentId, token) => {
  const response = await axios.get(`/bookings/student/${studentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Get all bookings (admin)
export const getAllBookings = async (token) => {
  const response = await axios.get(`/bookings`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Cancel a booking
export const cancelBooking = async (bookingId, token) => {
  const response = await axios.put(`/bookings/cancel/${bookingId}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Update booking (admin only)
export const updateBooking = async (bookingId, bookingData, token) => {
  const response = await axios.put(`/bookings/${bookingId}`, bookingData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
