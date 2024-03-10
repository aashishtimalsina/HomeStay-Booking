import React from "react";
import { trek } from "../Constants";
import styles from "../../style";
import Navbar from "../Navbar";

const Hero = () => {
  return (
    <div className="lg:h-screen bg-cover bg-no-repeat bg-center w-full">
      {/* <Navbar /> */}
      <div className="flex items-center justify-center w-full h-full bg-black bg-opacity-15">
        <div className="container mx-auto flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 p-8">
            <h1 className={`${styles.heading2} text-black mb-4 md:text-center`}>
              Our Services
            </h1>
            <p className={`${styles.paragraph} text-black`}>
              "Discover the essence of comfort and personalized care in our home
              stay services, where every stay is a warm embrace of hospitality."
            </p>
          </div>
          <div className="lg:w-1/2 p-8">
            <img
              src={trek}
              alt="Trek"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
