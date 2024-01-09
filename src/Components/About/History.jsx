import React from "react";
import { history } from "./costant";
import styles from "../../style";

const History = () => {
  return (
    <section className="lg:h-screen h-full  w-full p-10 mb-5   bg-black bg-opacity-10">
      {history.map((data) => (
        <div
          key={data.id}
          className="flex  flex-col lg:flex-row justify-center   w-full h-full"
        >
          <div className="lg:w-1/2 p-3">
            <h1 className={`${styles.heading2} mb-5`}>{data.lable}</h1>
            <p className={`${styles.paragraph}`}>{data.discription}</p>
          </div>
          <div className="lg:w-1/2 mb-4 lg:mb-0">
            <img
              src={data.image}
              className="h-custom m-auto rounded-md lg:w-4/5"
            />
          </div>
        </div>
      ))}
    </section>
  );
};

export default History;
