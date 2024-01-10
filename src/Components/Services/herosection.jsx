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
      <div className="w-full h-full     bg-black bg-opacity-45">
        <Navbar />
        <div className=" w-full h-full flex justify-center items-center  p-3 ">
          <div className="mb-24">
            <h1
              className={`${styles.heading2}  text-white text-left  md:text-center  m-2 `}
            >
              Our Services
            </h1>
            <p className={`${styles.paragraph} text-white  `}>
              "Discover the essence of comfort and personalized care in our home
              stay services, where every stay is a warm embrace of hospitality."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
