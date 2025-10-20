import React, { useState, useEffect } from "react";
import Loader from "../components/common/Loader";
import Button from "../components/common/Button";
import HostelCard from "../components/hostel/HostelCard";
import RoomCard from "../components/hostel/RoomCard";
import BookingCard from "../components/hostel/BookingCard";

import useAuth from "../hooks/useAuth";
import {
  getAllHostels,
  createHostel,
  updateHostel,
  deleteHostel,
} from "../api/hostelApi";
import { getRoomsByHostel, createRoom, updateRoom, deleteRoom } from "../api/roomApi";
import { getAllBookings, updateBooking } from "../api/bookingApi";

import "../styles/pages/Dashboard.css";

const Dashboard = () => {
  const { user, token } = useAuth();

  const [loading, setLoading] = useState(true);
  const [hostels, setHostels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedHostel, setSelectedHostel] = useState(null);
  const [error, setError] = useState("");

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setError("Authentication required. Please log in.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(""); // Reset error on retry
      try {
        const allHostels = await getAllHostels();
        setHostels(allHostels);

        const allBookings = await getAllBookings(token);
        setBookings(allBookings);

        if (allHostels.length > 0) {
          const initialRooms = await getRoomsByHostel(allHostels[0]._id);
          setRooms(initialRooms);
          setSelectedHostel(allHostels[0]);
        }
      } catch (err) {
        console.error(err);
        const message = err.response?.data?.message || err.message || "Failed to load dashboard data. Please try again.";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  // Hostel actions
  const handleSelectHostel = async (hostel) => {
    setSelectedHostel(hostel);
    try {
      const roomsData = await getRoomsByHostel(hostel._id);
      setRooms(roomsData);
    } catch (err) {
      console.error(err);
      setRooms([]);
    }
  };

  const handleAddHostel = async () => {
    // TODO: Replace prompt with a proper form/modal
    const name = prompt("Enter new hostel name:");
    const university = prompt("Enter university:");
    const location = prompt("Enter location:");
    if (!name || !university || !location || !token) return;
    try {
      const newHostel = await createHostel({ name, university, location }, token);
      setHostels((prev) => [...prev, newHostel]);
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.message || err.message || "Failed to add hostel.";
      alert(message);
    }
  };

  const handleDeleteHostel = async (hostelId) => {
    if (!window.confirm("Are you sure you want to delete this hostel?")) return;
    if (!token) return alert("Authentication required.");
    try {
      await deleteHostel(hostelId, token);
      setHostels((prev) => prev.filter((h) => h._id !== hostelId));
      if (selectedHostel?._id === hostelId) {
        setSelectedHostel(null);
        setRooms([]);
      }
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.message || err.message || "Failed to delete hostel.";
      alert(message);
    }
  };

  // Room actions
  const handleAddRoom = async () => {
    // TODO: Replace prompt with a proper form/modal
    if (!selectedHostel) return alert("Select a hostel first!");
    if (!token) return alert("Authentication required.");
    const name = prompt("Enter room name/number:");
    const type = prompt("Enter room type (Single/Double/Unisex):");
    const price = prompt("Enter room price (UGX):");
    if (!name || !type || !price) return;
    try {
      const newRoom = await createRoom({ name, type, price }, token);
      setRooms((prev) => [...prev, newRoom]);
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.message || err.message || "Failed to add room.";
      alert(message);
    }
  };

  const handleDeleteRoom = async (roomId) => {
    if (!window.confirm("Delete this room?")) return;
    if (!token) return alert("Authentication required.");
    try {
      await deleteRoom(roomId, token);
      setRooms((prev) => prev.filter((r) => r._id !== roomId));
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.message || err.message || "Failed to delete room.";
      alert(message);
    }
  };

  // Booking actions
  const handleUpdateBooking = async (bookingId, status) => {
    if (!token) return alert("Authentication required.");
    try {
      await updateBooking(bookingId, { status }, token);
      setBookings((prev) =>
        prev.map((b) => (b._id === bookingId ? { ...b, status } : b))
      );
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.message || err.message || "Failed to update booking.";
      alert(message);
    }
  };

  if (loading) return <Loader message="Loading Dashboard..." />;
  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="dashboard-page">

      {/* Hostels Management */}
      <section className="hostels-section">
        <h2>Hostels Management</h2>
        <Button onClick={handleAddHostel}>Add New Hostel</Button>
        <div className="hostels-list">
          {hostels.length > 0 ? (
            hostels.map((hostel) => (
              <HostelCard
                key={hostel._id}
                hostel={hostel}
                onClick={() => handleSelectHostel(hostel)}
                onDelete={() => handleDeleteHostel(hostel._id)}
              />
            ))
          ) : (
            <p>No hostels found.</p>
          )}
        </div>
      </section>

      {/* Rooms Management */}
      {selectedHostel && (
        <section className="rooms-section">
          <h2>Rooms in {selectedHostel.name}</h2>
          <Button onClick={handleAddRoom}>Add New Room</Button>
          <div className="rooms-list">
            {rooms.length > 0 ? (
              rooms.map((room) => (
                <RoomCard
                  key={room._id}
                  room={room}
                  onDelete={() => handleDeleteRoom(room._id)}
                />
              ))
            ) : (
              <p>No rooms available.</p>
            )}
          </div>
        </section>
      )}

      {/* Bookings Management */}
      <section className="bookings-section">
        <h2>Bookings Management</h2>
        <div className="bookings-list">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <BookingCard
                key={booking._id}
                booking={booking}
                onApprove={() => handleUpdateBooking(booking._id, "Approved")}
                onReject={() => handleUpdateBooking(booking._id, "Rejected")}
              />
            ))
          ) : (
            <p>No bookings yet.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;