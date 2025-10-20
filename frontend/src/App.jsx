// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

// Pages
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Hostels from "./pages/Hostels";
import HostelDetails from "./pages/HostelDetails";
import Rooms from "./pages/Rooms";
import Bookings from "./pages/Bookings";
import AdminPanel from "./pages/AdminPanel";

// Components
import Navbar from "./components/common/Navbar";
import Loader from "./components/common/Loader";
import PrivateRoute from "./components/routes/PrivateRoute";
import { AuthContext } from "./context/AuthContext";

/**
 * App component
 * Main routing configuration
 */
const App = () => {
  const { loading } = useContext(AuthContext);

  if (loading) return <Loader />;

  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Student Routes */}
          <Route
            path="/hostels"
            element={
              <PrivateRoute roles={["student"]}>
                <Hostels />
              </PrivateRoute>
            }
          />
          <Route
            path="/hostels/:id"
            element={
              <PrivateRoute roles={["student"]}>
                <HostelDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/rooms/:id"
            element={
              <PrivateRoute roles={["student"]}>
                <Rooms />
              </PrivateRoute>
            }
          />
          <Route
            path="/bookings"
            element={
              <PrivateRoute roles={["student"]}>
                <Bookings />
              </PrivateRoute>
            }
          />

          {/* Admin/Hostel Owner Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute roles={["admin"]}>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute roles={["admin"]}>
                <AdminPanel />
              </PrivateRoute>
            }
          />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;