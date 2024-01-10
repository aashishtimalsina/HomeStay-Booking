import React from "react";
import HeroSection from "./heroSection";
import Activities from "./activities";
import Service from "./service";

import Galary from "./Galary";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <Activities />
      <Service />
      <Galary />
    </div>
  );
};

export default Home;
