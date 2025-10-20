import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "../../styles/components/common/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Campus Hostels</Link>
      </div>

      <div className={`navbar-links ${isMobileMenuOpen ? "active" : ""}`}>
        {user ? (
          <>
            {/* Student Links */}
            {user.role === "student" && (
              <>
                <Link to="/">Home</Link>
                <Link to="/hostels">Hostels</Link>
                <Link to="/bookings">My Bookings</Link>
              </>
            )}

            {/* Admin / Hostel Owner Links */}
            {user.role === "admin" && (
              <>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/hostels">Manage Hostels</Link>
                <Link to="/rooms">Manage Rooms</Link>
                <Link to="/bookings">Bookings</Link>
              </>
            )}

            {/* Profile / Logout */}
            <div className="navbar-dropdown">
              <span className="navbar-user">{user.name}</span>
              <div className="navbar-dropdown-content">
                <Link to="/profile">Profile</Link>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="register-btn">
              Register
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="navbar-mobile-toggle" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? "✖" : "☰"}
      </div>
    </nav>
  );
};

export default Navbar;
