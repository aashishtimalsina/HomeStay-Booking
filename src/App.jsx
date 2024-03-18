import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Contact from "./Components/Contact";
import About from "./Components/About";
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
import GuestAsign from "./Admin dasbord/components/GuestAssign/GuestAsign.jsx";
import ActivitesViewmorePage from "./Components/Home/ActivitiViewmorePage.jsx";
import DetailPage from "./Admin dasbord/Host/Detail.jsx";
import Reviews from "./Admin dasbord/review/Review.jsx";
import GuestAsignForm from "./Components/Form/GuestAsignForm.jsx";
// import EditDetailForm from "./Admin dasbord/Host/Edit.jsx";
import EditDetailForm from "./Admin dasbord/Host/Edit.jsx";
import ActivityForm from "./Admin dasbord/components/Activity/AddActivityForm.jsx";
import EditActivity from "./Admin dasbord/components/Activity/EditActivity.jsx";
import ActivityDetail from "./Admin dasbord/components/Activity/ActivityDetail.jsx";
import LoginState from "./context/logincontext/loginstate.jsx";
import BookingForm from "./Components/Form/BookingForm.jsx";
import Cookies from "js-cookie";
import AboutUs from "./Admin dasbord/AboutUs/AboutUs.jsx";
import EditAboutUs from "./Admin dasbord/AboutUs/EditAboutUs.jsx";

const App = () => {
     const location = useLocation();
     const navigate = useNavigate();
  const isAdminPage = location.pathname.startsWith("/admin");
   const token = Cookies.get("token");
   const role = Cookies.get("role");

   useEffect(() => {
  
  if(isAdminPage  && token === undefined &&  role === undefined ){
      navigate('/login');
    }else if(isAdminPage  && token != undefined &&  role === "user" ){
      navigate('/');
    }
   }, [isAdminPage, token, navigate]);
  return (
    <>
      <LoginState>
        {isAdminPage ? "" : <Navbar />}
        <Routes>
          {/* public routes */}
          <Route exact path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/service" element={<Services />} />
          <Route path="/viewMore/:id" element={<ActivitesViewmorePage />} />
          <Route path="/bookingForm" element={<BookingForm />} />
           {/* private routes  */}
          {isAdminPage && token !== undefined && role=="admin" &&(
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
              <Route path="guestAssign" element={<GuestAsign />} />
              <Route path="review" element={<Reviews />} />
              <Route path="aboutUs" element={<AboutUs />} />
              <Route path="aboutUs/edit/:id" element={<EditAboutUs />} />


              <Route
                path="guestAssign/guestAsignForm"
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
