import React from "react";
import HeroSection from "./heroSection";
import Activities from "./activities";
import Service from "./service";

import Galary from "./Galary";
import BookingForm from "../Form/BookingForm";
import ActivityBookingForm from "../Form/ActivityBookingForm";
import GuestAsignForm from "../Form/GuestAsignForm";
import HomeStaySection from "./HomeStaySection";
import { useContext } from "react";
import LoginContex from "../../context/logincontext/CreateLoginContex";

const Home = () => {
  const status = useContext(LoginContex);
  return (
    <div>
      <HeroSection />

      {/* {status.loginstate ? <BookingForm /> : ""} */}

      <HomeStaySection />
      {/* <ActivityBookingForm /> */}
      {/* <GuestAsignForm /> */}
      <Activities />
      <Service />
      <Galary />
    </div>
  );
};

export default Home;
