import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

// Get all students (admin only)
export const getAllStudents = async (token) => {
  const response = await axios.get(`${API_URL}/students`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Get single student by ID
export const getStudentById = async (id, token) => {
  const response = await axios.get(`${API_URL}/students/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Update student info
export const updateStudent = async (id, studentData, token) => {
  const response = await axios.put(`${API_URL}/students/${id}`, studentData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
