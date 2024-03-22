import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Contact from "./Components/Contact";
import About from "./Components/About";
import Hosts from "./Components/Host";
import Footer from "./Components/Footers";
import Services from "./Components/Services";
import Signup from "./Components/signup";
import Login from "./Components/login";
import Dashboard from "./Admin dasbord/components/Dashboard/Dashboard";
import Admin from "./Admin dasbord/index.jsx";
import BarGraph from "./Admin dasbord/components/reuseable/BarGraph.jsx";
import Host from "./Admin dasbord/Host/Host.jsx";
import AddDetailForm from "./Admin dasbord/Host/Add.jsx";
import Activity from "./Admin dasbord/components/Activity/Activity.jsx";
import ActivitesViewmorePage from "./Components/Home/ActivitiViewmorePage.jsx";
import DetailPage from "./Admin dasbord/Host/Detail.jsx";
import Reviews from "./Admin dasbord/review/Review.jsx";
import GuestAsignForm from "./Components/Form/GuestAsignForm.jsx";
import EditDetailForm from "./Admin dasbord/Host/Edit.jsx";
import ActivityForm from "./Admin dasbord/components/Activity/AddActivityForm.jsx";
import EditActivity from "./Admin dasbord/components/Activity/EditActivity.jsx";
import ActivityDetail from "./Admin dasbord/components/Activity/ActivityDetail.jsx";
import LoginState from "./context/logincontext/loginstate.jsx";
import BookingForm from "./Components/Form/BookingForm.jsx";
import Cookies from "js-cookie";
import AboutUs from "./Admin dasbord/AboutUs/AboutUs.jsx";
import EditAboutUs from "./Admin dasbord/AboutUs/EditAboutUs.jsx";
import Booking from "./Admin dasbord/components/booking/Booking.jsx";
import ActivityBooking from "./Admin dasbord/ActivityBooking/ActivityBooking.jsx";
import haversine from "haversine-distance";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminPage = location.pathname.startsWith("/admin");
  const islogedIn =
    location.pathname === "/login" || location.pathname === "/signup";
  const token = Cookies.get("token");
  const role = Cookies.get("role");
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    if (isAdminPage && token === undefined && role === undefined) {
      navigate("/login");
    } else if (isAdminPage && token !== undefined && role === "user") {
      navigate("/");
    } else if (islogedIn && token !== undefined && role === "user") {
      navigate("/");
    } else if (islogedIn && token !== undefined && role === "admin") {
      navigate("/admin/dashboard");
    }

    if (location.pathname === "/") {
      requestLocationPermission();
    }
  }, [isAdminPage, token, navigate, pathname, location.pathname]);

  const requestLocationPermission = () => {
    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      if (result.state === "granted") {
        getCurrentPosition();
      } else if (result.state === "prompt") {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            Cookies.set("latitude", latitude);
            Cookies.set("longitude", longitude);
            calculateDistanceFromDestination(latitude, longitude);
          },
          (error) => {
            console.error("Error getting location:", error);
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          }
        );
      } else if (result.state === "denied") {
        console.log("Location permission denied");
      }
    });
  };

  const getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        Cookies.set("latitude", latitude);
        Cookies.set("longitude", longitude);
        calculateDistanceFromDestination(latitude, longitude);
      },
      (error) => {
        console.error("Error getting location:", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };

  const calculateDistanceFromDestination = (userLatitude, userLongitude) => {
    const destinationLocation = { latitude: 27.58741,longitude: 85.50915 }; 
    const userLocation = { latitude: userLatitude, longitude: userLongitude };
    const distanceInMeter = haversine(userLocation, destinationLocation);
    const distance = (distanceInMeter / 1000).toFixed(2);

    Cookies.set("distance", distance);
    console.log(`Distance from user's location to destination: ${distance} meters`);
  };

  return (
    <>
      <LoginState>
        {isAdminPage ? "" : <Navbar />}
        <Routes>
          {/* public routes */}
          <Route
                path="booking/guestAsignForm"
                element={<GuestAsignForm />}
              />
         
          <Route exact path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/host" element={<Hosts />} />
          {token === undefined && (
            <>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </>
          )}
          <Route path="/service" element={<Services />} />
          <Route path="/viewMore/:id" element={<ActivitesViewmorePage />} />

          <Route path="/bookingForm" element={<BookingForm />} />
          {/* private routes  */}
          {isAdminPage && token !== undefined && role === "admin" && (
            <Route path="/admin" element={<Admin />}>
              <Route path="dashboard" element={<Dashboard />} />

              <Route path="host" element={<Host />} />
              <Route path="host/add" element={<AddDetailForm />} />

              <Route path="host/update/:id" element={<EditDetailForm />} />
              {/* {/* <Route path="host/delete/:id" element={<Hostdelete />} /> */}
              <Route path="host/detail/:id" element={<DetailPage />} />
              <Route path="activity" element={<Activity />} />
              <Route path="activity/add" element={<ActivityForm />} />
              <Route path="activity/detail/:id" element={<ActivityDetail />} />
              <Route path="activity/edit/:id" element={<EditActivity />} />
              <Route path="Booking" element={<Booking />} />
              <Route path="activityBooking" element={<ActivityBooking />} />
              <Route path="review" element={<Reviews />} />
              <Route path="aboutUs" element={<AboutUs />} />
              <Route path="aboutUs/edit/:id" element={<EditAboutUs />} />

              <Route
                path="booking/guestAsignForm/:id"
                element={<GuestAsignForm />}
              />
            </Route>
          )}
        </Routes>
        {isAdminPage ? "" : <Footer />}
      </LoginState>
    </>
  );
};

export default App;