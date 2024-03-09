import React from "react";
import Card from "./cards";
import Aboutus from "./aboutus";
import History from "./History";
import Navbar from "../Navbar";

const About = () => {
  return (
    <section>
      {/* <Navbar /> */}
      <Aboutus />
      <Card />
      <History />
    </section>
  );
};

export default About;
