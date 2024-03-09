import React, { useContext } from "react";
import { HomeDetails } from "./constant";
import "../../index.css";
import Navbar from "../Navbar";
import { background, luxury } from "../Constants";
import { nature } from "../Constants";
import { Addbutton } from "../../Admin dasbord/components/Button/Addbutton";
import { Link } from "react-router-dom";
import LoginContex from "../../context/logincontext/CreateLoginContex";

const HeroSection = () => {
  const status = useContext(LoginContex);
  return (
    <>
      {HomeDetails.map((data) => (
        <div
          key={data.id}
          className="lg:h-screen bg-cover h-full   bg-center  w-full overflow-hidden "
          style={{
            backgroundImage: `url(${background})`,
          }}
        >
          <div className=" w-full h-full bg-black  bg-opacity-45 ">
            <Navbar />
            <div className=" lg:w-3/5 w-custom  flex justify-center h-full items-center  m-auto  ">
              <div>
                <p className=" mb-2 text-md font-normal text-center w-full   text-white lg:text-xl   ">
                  {data.preview}
                </p>
                <h1 className="mb-5  lg:text-4xl  text-center lg:w-auto font-semibold tracking-tight lg:leading-[70px] sm:leading-none md:leading-loose leading-loose  my-3  text-white line-clamp-5  md:text-5xl text-xl dark:text-white">
                  {data.label}
                </h1>

                <p className="text-center mb-10 text-sm lg:text-md text-white ">
                  {data.location}
                </p>
                <div className="flex  z-20 w-full item-center justify-center">
                  <Link to={status.loginstate ? "/bookingForm" : "/login"}>
                    <button className="bg-blue-500 w-44 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Book Now
                    </button>
                  </Link>
                </div>
              </div>

              {/* <div className=" flex  justify-center items-center h-full   flex-wrap   px-4 py-5 mx-auto ">
            <div className=" flex justify-center h-full items-center  m-auto  lg:w-1/2 mt-10 w-full ">
              <div>
                <p className=" mb-2 text-lg font-normal text-left w-full   text-gray-500 lg:text-xl   ">
                  {data.preview}
                </p>
                <h1 className="mb-5 text-4xl  lg:w-auto font-semibold tracking-tight sm:leading-none md:leading-loose leading-loose  my-3  text-white line-clamp-5  md:text-5xl lg:text-6xl dark:text-white">
                  {data.label}
                </h1>
                <div className=" flex flex-col mt-2 mb-10 lg:mb-16 text-black space-y-4 sm:flex-row  sm:space-y-0 sm:space-x-4">
                  <img
                    src={data.locationIcon}
                    alt="Location Icon"
                    className="w-6 h-6 mr-2 text-gray-300  text-left"
                  />
                  <p className="text-left ">{data.location}</p>
                </div>
              </div>
            </div>
            <div className=" lg:w-1/2 w-full flex md:justify-center  justify-between ">
              <div
                className={
                  " flex  md:justify-between justify-center  flex-wrap   lg:relative h-60  w-full lg:w-80 "
                }
              >
                {data.image.map((image) => (
                  <div key={image.id} className="flex justify-between w-full">
                    <img
                      src={`${image.image1}`}
                      className="   hover:z-10 w-80 lg:w-full  border-4 lg:absolute   border-gray-200 rounded-sm m-auto"
                    />
                    <img
                      src={`${image.image2}`}
                      className=" hidden md:block border-4 lg:absolute w-80 lg:w-full lg:top-28 lg:left-32  border-gray-200 rounded-sm m-auto"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div> */}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default HeroSection;
