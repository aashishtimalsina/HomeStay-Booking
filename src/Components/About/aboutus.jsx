import React from "react";
import { aboutUS } from "./costant";
import { nature } from "../Constants";
import styles from "../../style";

const Aboutus = () => {
  return (
    <section className="lg:h-screen h-full  w-full p-10 mb-5   bg-primary-2">
      {aboutUS.map((data) => (
        <div
          key={data.id}
          className="flex flex-col lg:flex-row justify-center w-full h-full"
        >
          <div className="lg:w-1/2 mb-4 lg:mb-0">
            <img
              src={data.image}
              className="h-costum w-96 m-auto rounded-md lg:w-4/5"
            />
          </div>
          <div className="lg:w-1/2 p-3">
            <h1 className={`${styles.heading2}`}>{data.lable}</h1>
            <p className={`${styles.paragraph}`}>{data.discription}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Aboutus;
