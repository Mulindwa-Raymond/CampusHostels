import React from "react";
import "../../styles/components/cards/BookingCard.css";
import { FaCalendarAlt, FaUser, FaBed, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import Button from "../common/Button";

const BookingCard = ({ booking, onCancel }) => {
  const {
    studentName,
    hostelName,
    roomType,
    roomGender,
    checkInDate,
    checkOutDate,
    location,
    price,
    contactNumber,
    status // pending, confirmed, canceled
  } = booking;

  return (
    <div className="booking-card">
      <div className="booking-header">
        <h3>{hostelName}</h3>
        <span className={`booking-status ${status}`}>{status.toUpperCase()}</span>
      </div>

      <div className="booking-info">
        <p><FaUser /> Student: {studentName}</p>
        <p><FaBed /> Room: {roomType} ({roomGender})</p>
        <p><FaCalendarAlt /> Check-In: {new Date(checkInDate).toLocaleDateString()}</p>
        <p><FaCalendarAlt /> Check-Out: {new Date(checkOutDate).toLocaleDateString()}</p>
        <p><FaMapMarkerAlt /> Location: {location}</p>
        <p><FaPhone /> Contact: {contactNumber}</p>
        <p>Price: UGX {price?.toLocaleString()}</p>
      </div>

      <div className="booking-actions">
        {status === "pending" && (
          <Button variant="danger" onClick={() => onCancel(booking._id)}>
            Cancel Booking
          </Button>
        )}
        <Button variant="primary" onClick={() => alert(`Viewing details of booking at ${hostelName}`)}>
          View Details
        </Button>
      </div>
    </div>
  );
};

export default BookingCard;
