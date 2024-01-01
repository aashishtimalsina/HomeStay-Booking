import React from "react";
import { HomeDetails } from "./constant";
import "../../index.css";
const HeroSection = () => {
  return (
    <>
      {HomeDetails.map((data) => (
        <section key={data.id} className=" bg-primary-2 ">
          <div className="grid max-w-screen-xl  px-4 py-8 mx-auto my-auto lg:gap-4 xl:gap-10 lg:py-16 lg:grid-cols-12">
            <div className=" my-auto sm:col-span-full  lg:col-span-7">
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
            <div className=" md-cols-12 sm:cols-span-full  lg-cols-5">
              <div
                className=" flex  w-80 h-full relative
               lg:px-auto md:col-span-12 sm:col-span-full sm:h-32  sm:w-80 "
              >
                {data.image.map((image) => (
                  <>
                    <img
                      src={`${image.image1}`}
                      className="  hover:z-10  border-4 absolute   border-gray-200 rounded-sm m-auto"
                    />
                    <img
                      src={`${image.image2}`}
                      className="  border-4 absolute   top-28 left-32  border-gray-200 rounded-sm m-auto"
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
