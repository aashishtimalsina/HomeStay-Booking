import React from "react";
import { HomeDetails } from "./constant";
import "../../index.css";
const HeroSection = () => {
  return (
    <>
      {HomeDetails.map((data) => (
        <section key={data.id} className=" bg-primary-1 ">
          <div className=" flex  justify-between flex-wrap   px-4 py-9 mx-auto my-auto ">
            <div className=" lg:w-1/2 w-full mt-10 my-auto">
              <p className=" mb-2 text-lg font-normal text-left w-full   text-gray-500 lg:text-xl   ">
                {data.preview}
              </p>
              <h1 className="mb-5 text-4xl  lg:w-auto font-semibold tracking-tight leading-none text-black md:text-5xl lg:text-6xl dark:text-white">
                {data.label}
              </h1>
              <div className=" flex flex-col mt-2 mb-8 lg:mb-16 space-y-4 sm:flex-row  sm:space-y-0 sm:space-x-4">
                <img
                  src={data.locationIcon}
                  alt="Location Icon"
                  className="w-6 h-6 mr-2 text-left"
                />
                <p className="text-left ">{data.location}</p>
              </div>
            </div>
            <div
              className=" lg:w-1/2 w-full flex md:justify-center justify-between
              "
            >
              <div
                className=" flex justify-between  flex-wrap  lg:relative
                  h-32   w-full lg:w-80 "
              >
                {data.image.map((image) => (
                  <>
                    <img
                      src={`${image.image1}`}
                      className="   hover:z-10 w-80 lg:w-full  border-4 lg:absolute mb-2   border-gray-200 rounded-sm m-auto"
                    />
                    <img
                      src={`${image.image2}`}
                      className=" hidden md:inline-block border-4   lg:absolute w-80 lg:w-full    top-28 lg:left-32 mt-2   border-gray-200 rounded-sm m-auto"
                    />
                  </>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
};

export default HeroSection;
