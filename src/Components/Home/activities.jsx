import React from "react";
import { activities } from "./constant";
import Button from "../reusuable/button";
import { Link } from "react-router-dom";
import styles from "../../style";

const Activities = () => {
  return (
    <div className=" p-20 pt-28  ">
      <div className="mb-9 ">
        <p className="text-gray-500 font-semibold text-center text-sm mb-1 ">
          WE FEATURE
        </p>
        <h1 className={`${styles.heading2} `}>Itinerary During Stay</h1>
      </div>
      <div className="flex gap-8 justify-center flex-wrap mt-10">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className={`  m-2 max-w-sm p-2 w-64 h-80 shadow-xl group hover:scale-110    transition-transform duration-700     border-none bg-white  rounded-md `}
          >
            <div className=" h-full    border-none  ">
              <div className="relative w-full h-44  mb-2">
                <img
                  src={activity.photo}
                  className=" absolute w-full h-full group-hover:animate-rotate rounded-md "
                />
                <div className="absolute z-10  w-full h-full bg-black group-hover:animate-rotate bg-opacity-5 ">
                  <p className=" font-sans text-xs m-2  text-white bg-primary-6 bg-opacity-50 border-2 border-gray-300 w-28 p-2 text-center ">
                    ${activity.price} / PERSON
                  </p>
                </div>
              </div>
              <div className=" flex justify-center   inset-0   border-none     w-full ">
                <div className="  w-full   p-3 k m-auto my-auto">
                  <div className=" text-base    ">
                    <p className="text-black font-sans text-xs font-bold">
                      {activity.catagory}
                    </p>
                    <h3 className="text-black text-2xl font-sans  font-bold">
                      {activity.label}
                    </h3>
                    <Link to="/viewMore">
                      <p className="text-black underline underline-offset-4 hover:no-underline transition-transform   text-sx font-semibold">
                        Discover More
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="  w-10/12 h-5/6 "></div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-9">
        <Button name="View All " width="200px" />
      </div>
    </div>
  );
};

export default Activities;

{
  /* <div
  key={activity.id}
  className="   max-w-sm w-72  m-2 shadow-primary-1   bg-white shadow rounded-md overflow-hidden hover:scale-110 transition-transform"
>
  <div className="w-full h-56 ">
    <img src={`${activity.photo}`} className=" rounded-sm  h-full" />
  </div>

  <div className="flex justify-between  p-2 ">
    <h5 className="mb-2  text-xl font-bold tracking-tight  text-black dark:text-white">
      {activity.label}
    </h5>

    <p className="font-semibold font-lg text-primary-1  dark:text-gray-400">
      $ {activity.price}
    </p>
  </div>
  <div className="p-3">
    <Button name="Read More" width="full" />
  </div>
</div> */
}
