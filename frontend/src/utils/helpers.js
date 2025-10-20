// src/utils/helpers.js

/**
 * ===============================
 * ✅  AUTH & TOKEN HELPERS
 * ===============================
 */

// Save token to localStorage
export const saveToken = (token) => {
  if (!token) return;
  localStorage.setItem("authToken", token);
};

// Get token from localStorage
export const getToken = () => {
  return localStorage.getItem("authToken");
};

// Remove token from localStorage
export const removeToken = () => {
  localStorage.removeItem("authToken");
};

// Check if user is logged in
export const isAuthenticated = () => {
  return !!getToken();
};


/**
 * ===============================
 * ✅  USER ROLE HELPERS
 * ===============================
 */

// Check if user is Admin/Hostel Owner
export const isAdmin = (user) => {
  return user?.role === "admin";
};

// Check if user is Student
export const isStudent = (user) => {
  return user?.role === "student";
};


/**
 * ===============================
 * ✅  FORM VALIDATIONS
 * ===============================
 */

// Email validation
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Password strength (at least 6 chars)
export const isStrongPassword = (password) => {
  return password && password.length >= 6;
};

// Ugandan phone validation (077..., 078..., 070..., 075..., etc)
export const isValidUgandanPhone = (phone) => {
  const regex = /^(07|03|04|02)\d{8}$/;
  return regex.test(phone);
};

// Empty field check
export const isEmpty = (value) => {
  return !value || value.trim() === "";
};


/**
 * ===============================
 * ✅  NUMBER & PRICE HELPERS
 * ===============================
 */

// Format number 1000 -> "1,000"
export const formatNumber = (num) => {
  return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "0";
};

// Format price in UGX
export const formatPrice = (amount) => {
  return `UGX ${formatNumber(amount)}`;
};

// Calculate total cost (e.g booking fees + deposit + etc)
export const calculateTotalCost = (...values) => {
  return values.reduce((sum, val) => sum + (Number(val) || 0), 0);
};


/**
 * ===============================
 * ✅  DATE HELPERS
 * ===============================
 */

// Convert ISO date -> readable format
export const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-UG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Check if a date is in the past
export const isPastDate = (dateString) => {
  const today = new Date();
  const inputDate = new Date(dateString);
  return inputDate < today;
};


/**
 * ===============================
 * ✅  STRING HELPERS
 * ===============================
 */

// Capitalize first letter of a string
export const capitalize = (text) => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
};

// Truncate long text
export const truncateText = (text, maxLength = 100) => {
  if (!text) return "";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};


/**
 * ===============================
 * ✅  LOCAL STORAGE HELPERS
 * ===============================
 */

// Save object to storage
export const saveToStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Get object from storage
export const getFromStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

// Remove from storage
export const removeFromStorage = (key) => {
  localStorage.removeItem(key);
};


/**
 * ===============================
 * ✅  MISC HELPERS
 * ===============================
 */

// Generate random ID (useful for UI keys, temp bookings, etc)
export const generateID = () => {
  return Math.random().toString(36).substr(2, 9);
};

// Sleep/Delay function (useful for loaders or simulations)
export const delay = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Scroll to top of page
export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

