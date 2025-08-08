import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider, ProtectedRoute } from "./components/Login";

// Shared components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Public pages
import Home from "./pages/Home";
import CarDetails from "./pages/CarDetails";
import Car from "./pages/Car";
import MyBookings from "./pages/MyBookings";
import Tours from "./pages/Tours";

// Owner pages
import Layout from "./pages/owner/Layout";
import Dashboard from "./pages/owner/Dashboard";
import AddCar from "./pages/owner/AddCar";
import ManageCar from "./pages/owner/ManageCar";
import ManageBooking from "./pages/owner/ManageBooking";

// Tour Management for Owner
import AddTourPackage from "./pages/owner/AddTourPackage";
import ManageTourPackage from "./pages/owner/ManageTourPackage";
import ManageTourBooking from "./pages/owner/ManageTourBooking";

const AppContent = () => {
  const [showLogin, setShowLogin] = React.useState(false);
  const location = useLocation();
  const isOwnerPath = location.pathname.startsWith("/owner");

  return (
    <>
      {!isOwnerPath && <Navbar setShowLogin={setShowLogin} />}

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/cars/:id" element={<CarDetails />} />
        <Route path="/cardetails/:id" element={<CarDetails />} />
        <Route path="/cars" element={<Car />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/tours" element={<Tours />} /> {/* 👈 Move this OUTSIDE of /owner */}

        {/* Protected Owner routes */}
        <Route
          path="/owner"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />

          {/* Car Management */}
          <Route path="add-car" element={<AddCar />} />
          <Route path="manage-cars" element={<ManageCar />} />
          <Route path="manage-booking" element={<ManageBooking />} />
          <Route path="manage-bookings" element={<ManageBooking />} />

          {/* Tour Management */}
          <Route path="add-tour-package" element={<AddTourPackage />} />
          <Route path="manage-tour-packages" element={<ManageTourPackage />} />
          <Route path="manage-tour-bookings" element={<ManageTourBooking />} />
        </Route>
      </Routes>

      {!isOwnerPath && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
