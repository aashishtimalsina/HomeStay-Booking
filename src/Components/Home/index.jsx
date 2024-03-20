import React from "react";
import HeroSection from "./heroSection";
import MapSection from "./map";
import Activities from "./activities";
import Service from "./service";

import Galary from "./Galary";
import BookingForm from "../Form/BookingForm";
// import ActivityBookingForm from "../Form/ActivityBookingForm";
import GuestAsignForm from "../Form/GuestAsignForm";
import HomeStaySection from "./HomeStaySection";
import { useContext } from "react";
import LoginContex from "../../context/logincontext/CreateLoginContex";
import Review from "./review";
import ReviewDetail from "./reviewDetail";

const Home = () => {
  const status = useContext(LoginContex);
  return (
    <div>
      <HeroSection />
      <MapSection />

      {/* {status.loginstate ? <BookingForm /> : ""} */}

      <HomeStaySection />
      {/* <ActivityBookingForm /> */}
      {/* <GuestAsignForm /> */}
      <Activities />
      <Service />
      <Galary />
      <Review />
      <ReviewDetail />
    </div>
  );
};

export default Home;
