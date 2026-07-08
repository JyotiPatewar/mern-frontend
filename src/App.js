import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SignUp from "./components/SignUp";
import Login from "./components/Login";
import DaysReport from "./components/DaysReport";
import Admin from "./components/Admin";
import DriverDashboard from "./components/DriverDashboard";
import SupervisorDashboard from "./components/SupervisorDashboard";
import DriverRoute from "./components/DriverRoute";
import DriverCompletedTask from "./components/DriverCompletedTask";
import AssignLocation from "./components/AssignLocation";
import LocationCreatedashboard from "./components/LocationCreatedashboard";
import ShowAllLocations from "./components/ShowAllLocations";
import AdminRequestsDashboard from "./components/AdminRequestsDashboard";
import CareTakerDashboard from "./components/CareTakerDashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<Login />} />
        <Route
          path="/driver-dashboard"
          element={<DriverDashboard />}
        />

        <Route
          path="/caretaker"
          element={<CareTakerDashboard />}
        />

        <Route
          path="/supervisor-dashboard"
          element={<SupervisorDashboard />}
        />
        <Route
          path="/create-account"
          element={<SignUp />}
        />
        <Route
          path="/driver-route/:id"
          element={<DriverRoute />}
        />
        <Route
          path="/driver-completed-tasks"
          element={<DriverCompletedTask />}
        />
        <Route
          path="/create-location"
          element={<LocationCreatedashboard />}
        />
        <Route
          path="/assign-location"
          element={<AssignLocation />}
        />
        <Route
          path="/days-report"
          element={<DaysReport />}
        />
        <Route
          path="/see-all-locations"
          element={<ShowAllLocations />}
        />
    

           <Route
          path="/see-all-req-admin"
          element={<AdminRequestsDashboard />}
        />

<Route
  path="/create-location/:id"
  element={<LocationCreatedashboard />}
/>
  </Routes>
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
        newestOnTop
        closeOnClick
        pauseOnHover
      />
    </>
  );
}

export default App;