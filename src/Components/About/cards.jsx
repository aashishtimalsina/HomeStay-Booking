import React from "react";
import { ourMoto } from "./costant";
import styles from "../../style";

const Card = () => {
  return (
    <div className="mt-20 mb-20 ">
      <div>
        <h1 className={`${styles.heading2} mb-10  `}>OUR PRIMARY GOAL</h1>
      </div>
      <div className=" flex flex-1 flex-wrap lg:justify-between justify-center ">
        {ourMoto.map((data) => (
          <div
            key={data.id}
            className="w-72 h-96 m-5 border-2 overflow-hidden rounded-md border-black p-5 hover:bg-primary-1  fadeIn duration-1000  hover:bg-opacity-50 hover:border-gray-300 hover:scale-105 transition-all  "
          >
            <div className="w-full p-2">
              <img src={data.icon} alt="image" className=" w-24  h-24 m-auto" />
            </div>
            <div>
              <h5 className={`${styles.heading5} p-4`}>{data.lable}</h5>
              <p className={`${styles.paragraph}`}>{data.discription}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
