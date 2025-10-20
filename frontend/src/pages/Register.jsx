import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi.js";
import { AuthContext } from "../context/AuthContext";
import "../styles/pages/Register.css";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    studentID: "",
    phone: "",
    gender: "",
    role: "student", // default role
    university: "",
    location: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Example Ugandan universities & locations
  const universities = [
    "Makerere University",
    "Kyambogo University",
    "Mbarara University of Science and Technology",
    "Gulu University",
    "Uganda Christian University"
  ];

  const locations = [
    "Kampala",
    "Mbarara",
    "Gulu",
    "Jinja",
    "Mbale",
    "Fort Portal"
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await registerUser(formData);

      // Login immediately after registration
      login(data.user, data.token);

      // Redirect based on role
      if (formData.role === "student") {
        navigate("/"); // Home page for students
      } else {
        navigate("/dashboard"); // Dashboard for hostel owner/admin
      }

    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="register-form">
        <label>
          Full Name
          <input
            type="text"
            name="name"
            placeholder="John Kato"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

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

        <label>
          Role
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="student">Student</option>
            <option value="admin">Admin / Hostel Owner</option>
          </select>
        </label>

        {formData.role === "student" && (
          <>
            <label>
              Student ID
              <input
                type="text"
                name="studentID"
                placeholder="STU2025/001"
                value={formData.studentID}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              University
              <select
                name="university"
                value={formData.university}
                onChange={handleChange}
                required
              >
                <option value="">Select University</option>
                {universities.map((uni, idx) => (
                  <option key={idx} value={uni}>
                    {uni}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Location
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              >
                <option value="">Select Location</option>
                {locations.map((loc, idx) => (
                  <option key={idx} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </label>
          </>
        )}

        <label>
          Phone Number
          <input
            type="tel"
            name="phone"
            placeholder="0771234567"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Gender
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
