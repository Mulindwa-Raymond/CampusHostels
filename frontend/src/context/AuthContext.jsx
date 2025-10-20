import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({
  user: null,
  loading: false,
  setUser: () => {},
});

/**
 * AuthProvider manages authentication state and actions.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);        // user object
  const [token, setToken] = useState(null);      // jwt token
  const [loading, setLoading] = useState(true);  // initial load
  const [error, setError] = useState(null);      // auth-related errors

  /**
   * Initialize user on page refresh if token exists
   */
  useEffect(() => {
    const initializeAuth = async () => {
      const savedToken = localStorage.getItem("token");

      if (savedToken) {
        try {
          setAxiosAuthToken(savedToken);
          setToken(savedToken);
          const data = await getCurrentUserApi(savedToken);
          setUser(data);
        } catch (err) {
          console.error("Failed to fetch user", err);
          logout(); // clears bad token
        }
      }

      setLoading(false);
    };

    initializeAuth();
  }, []);

  /**
   * LOGIN: email + password
   */
  const login = async (email, password) => {
    try {
      setLoading(true);
      const data = await loginUserApi(email, password);

      localStorage.setItem("token", data.token);
      setAxiosAuthToken(data.token);

      setToken(data.token);
      setUser(data.user);
      setError(null);

      return data.user.role; // used for redirect
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * REGISTER: userData (student, admin, owner)
   */
  const register = async (userData) => {
    try {
      setLoading(true);
      const data = await registerUserApi(userData);

      localStorage.setItem("token", data.token);
      setAxiosAuthToken(data.token);

      setToken(data.token);
      setUser(data.user);
      setError(null);

      return data.user.role; // used for redirect
    } catch (err) {
      const message = err.response?.data?.message || "Registration failed";
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * REFRESH current authenticated user
   * Useful after profile edits, image upload, etc.
   */
  const refreshUser = async () => {
    try {
      const currentToken = token || localStorage.getItem("token");
      if (!currentToken) return;

      const data = await getCurrentUserApi(currentToken);
      setUser(data);
    } catch (err) {
      console.error("Failed to refresh user", err);
    }
  };

  /**
   * LOGOUT: clears everything
   */
  const logout = () => {
    localStorage.removeItem("token");
    setAxiosAuthToken(null);
    setToken(null);
    setUser(null);
  };

  /**
   * Expose state + methods
   */
  const value = {
    user,
    token,
    loading,
    error,
    login,
    register,
    logout,
    refreshUser,
    setUser, // optional - if manual edits
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
