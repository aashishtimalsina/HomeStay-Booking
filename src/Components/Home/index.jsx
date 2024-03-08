import React from "react";
import HeroSection from "./heroSection";
import Activities from "./activities";
import Service from "./service";

import Galary from "./Galary";
import BookingForm from "../Form/BookingForm";
import ActivityBookingForm from "../Form/ActivityBookingForm";
import GuestAsignForm from "../Form/GuestAsignForm";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <BookingForm />
      <ActivityBookingForm />
      <GuestAsignForm />
      <Activities />
      <Service />
      <Galary />
    </div>
  );
};

export default Home;
