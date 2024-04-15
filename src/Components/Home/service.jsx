import React from "react";
import { services, servicePhotos } from "./constant";
import styles from "../../style";

const Service = () => {
  return (
    <section className="p-10 mt-16   ">
      <div className="w-full">
        <div className="w-full  mt-5 flex lg:px-10 justify-center items-center lg:w-full  sm:w-1/2">
          <div className="lg:w-full">
            <p className="text-gray-500  md:text-left font-semibold text-sm mb-2">
              DISCOVER THE SERVICE WE OFFERED
            </p>
            <h2 className={` ${styles.heading2}text-black md:text-left`}>
              THE ESSENTIALS
            </h2>
          </div>
        </div>

        <div className="flex justify-center flex-wrap  ">
          {services.map((service) => (
            <div
              key={service.id}
              className="w-full sm:w-1/2   flex justify-start items-center mb-4"
            >
              <div className="w-16 h-16 m-2 flex items-center justify-center">
                <img
                  src={service.icon}
                  alt={service.name}
                  className="w-full h-auto"
                />
              </div>
              <div className="m-2">
                <h6 className="font-medium text-lg sm:text-2lg">
                  {service.name}
                </h6>
                <p className="font-normal text-base sm:text-sm">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;
