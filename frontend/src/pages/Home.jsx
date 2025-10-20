import React, { useState, useEffect } from "react";
import Navbar from "../components/common/Navbar";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Loader from "../components/common/Loader";
import HostelCard from "../components/hostel/HostelCard";
import RoomCard from "../components/hostel/RoomCard";
import BookingCard from "../components/hostel/BookingCard";
import Button from "../components/common/Button";

import useAuth from "../hooks/useAuth";
import { getAllHostels } from "../api/hostelApi";
import { getRoomsByHostel } from "../api/roomApi";
import { getBookingsByStudent } from "../api/bookingApi";

import "../styles/pages/Home.css";

const Home = () => {
  const { user, token } = useAuth();

  const [loading, setLoading] = useState(true);
  const [hostels, setHostels] = useState([]);
  const [filteredHostels, setFilteredHostels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("All");
  const [selectedHostel, setSelectedHostel] = useState(null);
  const [error, setError] = useState("");

  // Ugandan universities dropdown
  const universities = [
    "Makerere University",
    "Kyambogo University",
    "Mbarara University of Science and Technology",
    "Uganda Christian University",
    "Gulu University",
  ];

  // Sample hostel data for Ugandan setup (used if backend is empty)
  const sampleHostels = [
    {
      _id: "h001",
      name: "Nana Hostel",
      university: "Makerere University",
      location: "Kampala, Uganda",
      images: ["/images/nana1.jpg", "/images/nana2.jpg"],
      amenities: ["Wi-Fi", "Gym", "Kitchen", "Security"],
      roomTypes: ["Single", "Double", "Unisex"],
      contact: "+256701234567",
      description:
        "Located 10 mins from Makerere campus, Nana Hostel offers comfortable rooms with all amenities included.",
    },
    {
      _id: "h002",
      name: "Olympia Hostel",
      university: "Kyambogo University",
      location: "Kyambogo, Kampala",
      images: ["/images/olympia1.jpg", "/images/olympia2.jpg"],
      amenities: ["Wi-Fi", "Laundry", "CCTV Security"],
      roomTypes: ["Single", "Double"],
      contact: "+256701987654",
      description:
        "Olympia Hostel provides affordable accommodation with a modern kitchen and secure compound.",
    },
    {
      _id: "h003",
      name: "Victoria Hostel",
      university: "Mbarara University of Science and Technology",
      location: "Mbarara, Uganda",
      images: ["/images/victoria1.jpg", "/images/victoria2.jpg"],
      amenities: ["Wi-Fi", "Gym", "Parking"],
      roomTypes: ["Single", "Double", "Shared"],
      contact: "+256702345678",
      description:
        "Victoria Hostel offers student-friendly rooms near campus with great security.",
    },
  ];

  const fetchData = async () => {
    setLoading(true);
    setError(""); // Reset error on retry
    try {
      let allHostels = await getAllHostels();

      // fallback to sample hostels if backend empty
      if (!allHostels || allHostels.length === 0) {
        allHostels = sampleHostels;
      }

      setHostels(allHostels);
      setFilteredHostels(allHostels);

      // Select first hostel by default
      if (allHostels.length > 0) {
        const initialRooms = await getRoomsByHostel(allHostels[0]._id);
        setRooms(initialRooms);
        setSelectedHostel(allHostels[0]);
      }

      // Fetch student bookings only if user is student
      if (user?.role === "student" && user._id && token) {
        const userBookings = await getBookingsByStudent(user._id, token);
        setBookings(userBookings);
      } else {
        setBookings([]);
      }
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.message || err.message || "Failed to fetch data. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user, token]);

  // Filter hostels by university
  const handleUniversityChange = async (university) => {
    setSelectedUniversity(university);
    if (university === "All") {
      setFilteredHostels(hostels);
    } else {
      const filtered = hostels.filter(
        (h) => h.university.toLowerCase() === university.toLowerCase()
      );
      setFilteredHostels(filtered);
      if (filtered.length > 0) {
        try {
          const roomsData = await getRoomsByHostel(filtered[0]._id);
          setRooms(roomsData);
          setSelectedHostel(filtered[0]);
        } catch (err) {
          console.error(err);
          setRooms([]);
          setSelectedHostel(null);
        }
      } else {
        setRooms([]);
        setSelectedHostel(null);
      }
    }
  };

  // Search hostels by name (local filter since searchHostels not implemented in API)
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredHostels(hostels);
      return;
    }
    const results = hostels.filter((h) =>
      h.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredHostels(results);
  };

  // Select hostel to view its rooms
  const handleHostelSelect = async (hostel) => {
    setSelectedHostel(hostel);
    try {
      const roomsData = await getRoomsByHostel(hostel._id);
      setRooms(roomsData);
    } catch (err) {
      console.error(err);
      setRooms([]);
    }
  };

  // Booking actions
  const handleBookRoom = (room) => {
    alert(`Booking room ${room.name} at ${selectedHostel.name}`);
  };

  const handleCallHostel = (contact) => {
    window.open(`tel:${contact}`, "_blank");
  };

  const handleViewDetails = (hostel) => {
    alert(`Viewing details for ${hostel.name}`);
  };

  if (loading) return <Loader message="Loading Campus Hostels..." />;
  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <Button onClick={fetchData}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="home-page">
      <Navbar />
      <Header
        title={`Welcome to Campus Hostels, ${user?.name || "Student"}`}
        subtitle="Find your ideal hostel near your university in Uganda"
      />

      {/* Search and Filter Section */}
      <section className="search-filter">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for a hostel..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button onClick={handleSearch}>Search</Button>
        </div>

        <div className="university-filter">
          <label>Filter by University:</label>
          <select
            value={selectedUniversity}
            onChange={(e) => handleUniversityChange(e.target.value)}
          >
            <option value="All">All Universities</option>
            {universities.map((uni) => (
              <option key={uni} value={uni}>
                {uni}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Hostels Section */}
      <section className="hostels-section">
        <h2>Available Hostels</h2>
        <div className="hostels-list">
          {filteredHostels.length > 0 ? (
            filteredHostels.map((hostel) => (
              <HostelCard
                key={hostel._id}
                hostel={hostel}
                onClick={() => handleHostelSelect(hostel)}
                onCall={() => handleCallHostel(hostel.contact)}
                onViewDetails={() => handleViewDetails(hostel)}
              />
            ))
          ) : (
            <p>No hostels match your search or filter.</p>
          )}
        </div>
      </section>

      {/* Rooms Section */}
      {selectedHostel && (
        <section className="rooms-section">
          <h2>Rooms in {selectedHostel.name}</h2>
          <div className="rooms-list">
            {rooms.length > 0 ? (
              rooms.map((room) => (
                <RoomCard
                  key={room._id}
                  room={room}
                  onBook={() => handleBookRoom(room)}
                />
              ))
            ) : (
              <p>No rooms available in this hostel.</p>
            )}
          </div>
        </section>
      )}

      {/* Student Bookings Section */}
      {user?.role === "student" && (
        <section className="bookings-section">
          <h2>My Bookings</h2>
          <div className="bookings-list">
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <BookingCard key={booking._id} booking={booking} />
              ))
            ) : (
              <p>You currently have no bookings.</p>
            )}
          </div>
        </section>
      )}

      {/* Student Tools Section */}
      <section className="tools-section">
        <h2>Student Tools</h2>
        <div className="tools-buttons">
          <Button onClick={() => alert("Navigate to book a room")}>
            Book Now
          </Button>
          <Button onClick={() => alert("Navigate to pay rent")}>
            Pay Rent
          </Button>
          <Button onClick={() => alert("Navigate to hostel reviews")}>
            Reviews
          </Button>
          <Button onClick={() => alert("Contact hostel owner")}>Contact</Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;