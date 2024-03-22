import React, { useContext, useEffect, useState } from "react";
import "../../index.css";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import webApi from "../../Config/config";

const HeroSection = () => {
  const [status,SetStatus]=useState(false);
  const [Homestay, setHomestay] = useState([]);
  const apiUrls = webApi.apiUrl + "/getHomeStayInfo/1";

  React.useEffect(() => {
    const role = Cookies.get("role");

    const token = Cookies.get("token");
    if (token && token !== "undefined") {
      SetStatus(true);
    }
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrls, {
          headers: {
            "ngrok-skip-browser-warning": true,
          },
        });
        if (response.data) {
          setHomestay(response.data.homestay_details || []);
          console.log("getHomeStayInfo:", response.data.homestay_details);
        } else {
          console.error("Empty response data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
        <div
          key={Homestay.id}
          className="lg:h-screen h-full flex items-center justify-center"
        >
          <div className="container mx-auto flex lg:flex-row flex-col-reverse items-center">
            <div className="lg:w-1/2 h-full lg:order-2 order-1">
              <img src={Homestay.homeImage} alt="Background" className="w-full h-auto" />
            </div>
            <div className="lg:w-1/2 w-full lg:order-1 order-2">
              <div className="p-6">
                <p className="mb-2 text-sm lg:text-md text-gray-500">
                  {Homestay.title}
                </p>
                <h1 className="mb-5 text-3xl lg:text-5xl font-bold text-gray-800">
                  {Homestay.title}
                </h1>
                <p className="mb-5 text-gray-600">{Homestay.address}</p>
                <div className="">
                  <Link to={status ? "/bookingForm" : "/login"}>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => {
                        if (status == false) {
                          Cookies.set("redirectTo", "/bookingForm");
                        }
                      }}
                    >
                      Book Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default HeroSection;
