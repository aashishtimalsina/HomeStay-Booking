import React from "react";
import { activities } from "./constant";
import Button from "../reusuable/button";

const Activities = () => {
  return (
    <div>
      <div className="mb-9 ">
        <h1 className="font-bold mt-16 text-2xl text-gray-500 flex justify-center text-center ">
          We Feature
        </h1>
      </div>
      <div className="flex justify-between flex-wrap mt-10">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="   max-w-sm w-72  m-2 shadow-primary-1   bg-white shadow rounded-md  hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 "
          >
            <div className="w-full h-56 ">
              <img src={`${activity.photo}`} className=" rounded-sm  h-full" />
            </div>
            <div className="flex justify-between mt-6 p-3 ">
              <h5 className="mb-2  text-xl font-bold tracking-tight  text-black dark:text-white">
                {activity.label}
              </h5>

              <p className="font-semibold font-lg text-primary-1  dark:text-gray-400">
                $ {activity.price}
              </p>
            </div>
            <div className="p-3">
              <Button name="Book Now" width="full" />
            </div>
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
