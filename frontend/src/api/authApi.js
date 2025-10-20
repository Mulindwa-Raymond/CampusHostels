import axios from "axios";

/**
 * Registers a new user.
 * @param {object} userData - The user's registration data.
 * @returns {Promise<object>} The response data from the server.
 */
export const registerUser = (userData) => axios.post("/auth/register", userData);
/**
 * Logs in a user.
 *
 * @param {object} credentials - The user's credentials.
 * @param {string} credentials.email - The user's email.
 * @param {string} credentials.password - The user's password.
 * @returns {Promise<object>} The response data from the server.
 */
export const loginUser = async (credentials) => {
  const response = await axios.post("/auth/login", credentials);
  return response.data;
};