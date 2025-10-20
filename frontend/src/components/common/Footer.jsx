import React from "react";
import "../../styles/components/common/Footer.css";

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-container">
        {/* Brand / Company Info */}
        <div className="footer-brand">
          <h2>Campus Hostels</h2>
          <p>Professional hostel booking and management system for students and hostel owners in Uganda.</p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/hostels">Hostels</a></li>
            <li><a href="/bookings">Bookings</a></li>
            <li><a href="/dashboard">Dashboard</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p>Email: info@campushostels.ug</p>
          <p>Phone: +256 701 123 456</p>
          <p>Address: Kampala, Uganda</p>
        </div>

        {/* Social Media */}
        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#">Facebook</a>
            <a href="#">Twitter</a>
            <a href="#">Instagram</a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Campus Hostels. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
