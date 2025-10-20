import "../../styles/components/cards/RoomCard.css";
import { FaWifi, FaBed, FaBath } from "react-icons/fa";
import { MdLocalLaundryService } from "react-icons/md";
import Button from "../common/Button";

const RoomCard = ({ room }) => {
  const {
    name,
    type,
    gender,
    capacity,
    pricePerMonth,
    amenities,
    availability
  } = room;

  return (
    <div className="room-card">
      {/* Room Info */}
      <div className="room-info">
        <h3 className="room-name">{name || `${type} Room`}</h3>
        <p className="room-type">
          {type} - {gender} ({capacity} bed{capacity > 1 ? "s" : ""})
        </p>
        <p className="room-price">UGX {pricePerMonth?.toLocaleString()} / month</p>
        <p className="room-availability">
          {availability > 0 ? `${availability} rooms available` : "Fully booked"}
        </p>

        {/* Amenities */}
        <div className="room-amenities">
          {amenities?.wifi && <FaWifi title="Wi-Fi" />}
          {amenities?.bathroom && <FaBath title="Bathroom" />}
          {amenities?.laundry && <MdLocalLaundryService title="Laundry Service" />}
          {amenities?.bed && <FaBed title="Bed Included" />}
        </div>

        {/* Buttons */}
        <div className="room-card-buttons">
          <Button
            onClick={() => alert(`Booking room: ${name || type}`)}
            variant="primary"
            disabled={availability === 0}
          >
            {availability === 0 ? "Fully Booked" : "Book Now"}
          </Button>
          <Button variant="secondary" onClick={() => alert(`Viewing details of ${name || type}`)}>
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
