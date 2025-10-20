import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";
import { AuthContext } from "../context/AuthContext";
import "../styles/pages/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await loginUser(formData);

      // Save user & token in AuthContext
      login(data.user, data.token);

      // Redirect based on role
      if (data.user.role === "student") {
        navigate("/"); // Home page for students
      } else {
        navigate("/dashboard"); // Dashboard for hostel owners/admin
      }

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <label>
          Email
          <input
            type="email"
            name="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="register-link">
        Don't have an account? <span onClick={() => navigate("/register")}>Register here</span>
      </p>
    </div>
  );
};

export default Login;
