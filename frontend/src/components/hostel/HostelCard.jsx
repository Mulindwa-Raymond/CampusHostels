import React from "react";
import "../../styles/components/cards/HostelCard.css";
import { FaWifi, FaDumbbell, FaBath, FaUserFriends } from "react-icons/fa";
import { MdLocalLaundryService, MdCall } from "react-icons/md";
import Button from "../common/Button";

const HostelCard = ({ hostel }) => {
  const {
    name,
    location,
    pricePerMonth,
    description,
    amenities,
    roomTypes,
    contactNumber,
    images
  } = hostel;

  return (
    <div className="hostel-card">
      {/* Hostel Images */}
      <div className="hostel-images">
        {images && images.length > 0 ? (
          <img src={images[0]} alt={name} />
        ) : (
          <img src="/images/default-hostel.jpg" alt="Default Hostel" />
        )}
      </div>

      {/* Hostel Info */}
      <div className="hostel-info">
        <h2 className="hostel-name">{name}</h2>
        <p className="hostel-location">{location}</p>
        <p className="hostel-price">UGX {pricePerMonth?.toLocaleString()} / month</p>
        <p className="hostel-description">{description}</p>

        {/* Amenities */}
        <div className="hostel-amenities">
          {amenities?.wifi && <FaWifi title="Wi-Fi" />}
          {amenities?.gym && <FaDumbbell title="Gym" />}
          {amenities?.bathroom && <FaBath title="Private Bathroom" />}
          {amenities?.laundry && <MdLocalLaundryService title="Laundry Service" />}
          {amenities?.sharedRooms && <FaUserFriends title="Shared Rooms" />}
        </div>

        {/* Room Types */}
        <div className="hostel-room-types">
          {roomTypes?.map((room, idx) => (
            <span key={idx} className="room-type">
              {room.type} ({room.gender}) - {room.capacity} beds
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="hostel-card-buttons">
          {contactNumber && (
            <a href={`tel:${contactNumber}`}>
              <Button variant="secondary">
                <MdCall /> Call
              </Button>
            </a>
          )}
          <Button onClick={() => alert(`Booking hostel: ${name}`)} variant="primary">
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HostelCard;
