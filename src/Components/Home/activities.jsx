import React from "react";
import { activities } from "./constant";
import Button from "../reusuable/button";
import { Link } from "react-router-dom";

const Activities = () => {
  return (
    <div className=" p-10">
      <div className="mb-9 ">
        <h1 className="font-bold mt-16 text-2xl text-gray-500 flex justify-center text-center ">
          We Feature
        </h1>
      </div>
      <div className="flex   justify-center  flex-wrap mt-10">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className={`  m-2 max-w-sm w-72 h-80 shadow-custom overflow-hidden   border-none bg-white shadow rounded-md `}
          >
            <div className="relative h-full   hover:scale-110  overflow-hidden border-none  transition-transform  ">
              <img src={activity.photo} className=" h-full " />
              <div className=" flex justify-center  absolute inset-0 bg-black bg-opacity-10  border-none     w-full h-full">
                <div className="w-custom h-custom border-t border-r rounded-md border-white m-auto p-3 my-auto">
                  <p className="z-10 font-sans text-xs bg-white bg-opacity-100 w-28 p-2 text-center ">
                    ${activity.price} / PERSON
                  </p>
                  <div className=" text-base mt-40   ">
                    <p className="text-white text-xs font-bold">
                      {activity.catagory}
                    </p>
                    <h3 className="text-white text-2xl font-mono font-bold">
                      {activity.label}
                    </h3>
                    <Link to="#">
                      <p className="text-white underline underline-offset-4 hover:no-underline transition-transform   text-sx font-semibold">
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
