import React, { useContext, useEffect, useState } from "react";
import { HomeDetails } from "./constant";
import "../../index.css";
import Navbar from "../Navbar";
import { background, temple } from "../Constants";

import { Addbutton } from "../../Admin dasbord/components/Button/Addbutton";
import { Link } from "react-router-dom";
import LoginContex from "../../context/logincontext/CreateLoginContex";
import { Cookie } from "@mui/icons-material";
import Cookies from "js-cookie";

const HeroSection = () => {
  const [status,SetStatus]=useState(false);
  useEffect(() => {
    const role = Cookies.get("role");

  const token = Cookies.get('token');
  if (token && token !=="undefined") {
    
   SetStatus(true);
     }
  }, );
      return (
    <>
      {/* <Navbar /> */}
      {HomeDetails.map((data) => (
        <div
          key={data.id}
          className="lg:h-screen h-full flex items-center justify-center"
        >
          <div className="container mx-auto flex lg:flex-row flex-col-reverse items-center">
            <div className="lg:w-1/2 w-full lg:order-2 order-1">
              <img src={temple} alt="Background" className="w-full h-auto" />
            </div>
            <div className="lg:w-1/2 w-full lg:order-1 order-2">
              <div className="p-6">
                <p className="mb-2 text-sm lg:text-md text-gray-500">
                  {data.preview}
                </p>
                <h1 className="mb-5 text-3xl lg:text-5xl font-bold text-gray-800">
                  {data.label}
                </h1>
                <p className="mb-5 text-gray-600">{data.location}</p>
                <div className="">
                  <Link to={status ? "/bookingForm" : "/login"}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>{
                        if(status == false){
                          Cookies.set("redirectTo",'/bookingForm')
                        }
                    }}>
                      Book Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default HeroSection;
