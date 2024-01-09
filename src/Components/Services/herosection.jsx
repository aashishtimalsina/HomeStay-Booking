import React from "react";
import { trek } from "../Constants";
import styles from "../../style";
import Navbar from "../Navbar";

const Hero = () => {
  return (
    <div
      className="lg:h-screen bg-cover bg-no-repeat bg-center  w-full "
      style={{
        backgroundImage: `url(${trek})`,
      }}
    >
      <div className="w-full h-full     bg-black bg-opacity-15">
        <Navbar />
        <div className=" w-full h-full flex items-center  ">
          <h1 className={`${styles.heading2} text-white  `}>Our Services</h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;
