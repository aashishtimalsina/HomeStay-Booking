import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import { activityimage4 } from "../Constants";
import ActivityBookingForm from "../Form/ActivityBookingForm";
import LoginContex from "../../context/logincontext/CreateLoginContex";
import webApi from "../../Config/config";

const ActivitiesViewmorePage = () => {
  const status = useContext(LoginContex);
  const { id } = useParams();
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = webApi.apiUrl + '/getActivityDetail/'+id;

      console.log("apiUrl", apiUrl);
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            "ngrok-skip-browser-warning": true,
          },
        });
        console.log("response", response.data);
        if (response.data) {
          setActivity(response.data.activity_details || null);
        } else {
          console.error("Empty response data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
      {/* <Navbar /> */}
      <div className="flex flex-col md:flex-row bg-white">
        {/* Description Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          {activity && (
            <>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
                {activity.name}
              </h1>
              <p className="text-base md:text-lg text-gray-600 mb-6">
                {activity.about}
              </p>
              <div className="flex items-center text-base md:text-lg text-gray-600 mb-6">
                {/* Icon here if needed */}
                <p>{activity.location}</p>
              </div>
              <p className=" text-primary-6 text-xl md:text-2xl font-semibold">
                {`Rs ${activity.price} per guest`}
              </p>
            </>
          )}
        </div>
        {/* Photo Section */}
        <div className="w-full md:w-1/2">
          <img
            src={activityimage4}
            alt="Activity"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
      {/* Booking Form */}
      {status.loginstate && (
        <div className="mt-8 p-8 md:p-12 bg-gray-100">
          <ActivityBookingForm />
        </div>
      )}
    </>
  );
};

export default ActivitiesViewmorePage;
