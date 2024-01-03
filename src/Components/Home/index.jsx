import React from "react";
import HeroSection from "./heroSection";
import Activities from "./activities";
import Service from "./service";
import Room from "./room";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <Activities />
      <Service />
      <Room />
    </div>
  );
};

export default Home;
