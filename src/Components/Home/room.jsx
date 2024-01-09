import React from "react";
import { room } from "./constant";
import { Link } from "react-router-dom";
import Button from "../reusuable/button";

const Room = () => {
  return (
    <section className="p-5 mt-16 bg-primary-2">
      <div className="p-3">
        <p className="text-primary-4 mt-14 font-semibold text-sm mb-2">
          DISCOVER OUR ACCOMMODATIONS
        </p>
        <h2 className="font-serif font-bold text-4xl  text-black">ROOMS</h2>
      </div>
      <div className="lg:flex lg:justify-between">
        {room.map((data) => (
          <div
            className={`  m-2 ${
              data.id % 2 === 0 ? "lg:p-0" : "lg:p-5"
            } hover:scale-105 transition-transform`}
          >
            <div className=" relative  group ">
              <img src={data.image} alt="img" className=" z-0" />
              <div className="absolute  bg-black flex flex-wrap justify-center items-end bg-opacity-20  inset-1">
                <Link to="#">
                  <button
                    type="button"
                    className="bg-primary-4 items-start z-50 p-2 absolute top-2 left-2 bg-opacity-50  border-gray-200 border-2 border-opacity-35 text-white text-xs font-mono"
                  >
                    ${data.price} / NIGHT
                  </button>
                </Link>
                <div className="w-full p-3 group-hover:h-1/2  transition-opacity duration-3000 group-hover:bg-black group-hover:bg-opacity-20 ">
                  <h1 className=" font-mono font-bold text-center  text-3xl  text-white">
                    {data.label}
                  </h1>
                  <div className=" group-hover:flex  group-hover:justify-center mt-3 hidden ">
                    <button className=" p-2 rounded-md bg-opacity-60 border-gray-50 border-2 border-opacity-50 w-3/4  hover:inline-block text-white bg-primary-4 z-50 ">
                      Book Now
                    </button>
                  </div>
                </div>
                {/* {data.discription.map((detail) => ({
                  /* <div className="flex z-20 w-24 justify-between flex-wrap">
                    <img
                      src={detail.icon}
                      alt="icon"
                      className=" w-6 h-6 z-10 "
                    />
                    <p className=" z-10 text-white text-lg font-medium">
                      {detail.name}
                    </p>
                  </div> */}
                {/* ))} */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Room;
