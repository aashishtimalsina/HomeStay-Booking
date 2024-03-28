import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Navbar from "../Navbar";
import { activityimage4 } from "../Constants";
import ActivityBookingForm from "../Form/ActivityBookingForm";
import LoginContex from "../../context/logincontext/CreateLoginContex";
import webApi from "../../Config/config";
import Cookies from "js-cookie";

const ActivitiesViewmorePage = () => {
   const [status,SetStatus]=useState(false);

  const { id } = useParams();
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token && token !== "undefined") {
      SetStatus(true);
    }
    const fetchData = async () => {
      const apiUrl = webApi.apiUrl + '/getActivityDetail/'+id;
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            "ngrok-skip-browser-warning": true,
          },
        });
        if (response.data) {
          console.log(response.data);
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
          <br />
          <br />
         
          <div >
                  <Link to={status ? `/activity/booking/${id}` : "/login"}>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => {
                        if (status == false) {
                          Cookies.set("redirectTo",  `/activity/booking/${id}`);
                        }
                      }}
                    >
                      Book Now
                    </button>
                  </Link>
                </div>
        </div>
        {/* Photo Section */}
        <div className="w-full md:w-1/2">
          <img
            src={activity?activity.image:activityimage4}
            alt="Activity"
            className="w-full h-auto object-cover"
          />
        </div>
        
      </div>
    </>
  );
};

export default ActivitiesViewmorePage;
