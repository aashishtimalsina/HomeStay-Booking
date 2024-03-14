import React from "react";
import { ourMoto } from "./costant";
import styles from "../../style";

const Card = () => {
  return (
    <div className="mt-20 mb-20">
      <div>
        <h1 className={`${styles.heading2} text-center mb-10`}>
          Why Choose Us
        </h1>
      </div>
      <div className="flex flex-wrap justify-center gap-8">
        {ourMoto.map((data) => (
          <div
            key={data.id}
            className="w-72 h-auto bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden transform transition duration-300 hover:scale-105"
          >
            <div className="p-4 text-center">
              <img src={data.icon} alt="icon" className="w-20 h-20 mx-auto" />
            </div>
            <div className="p-4">
              <h5 className={`${styles.heading5} text-center mb-4`}>
                {data.lable}
              </h5>
              <p className={`${styles.paragraph} text-center text-sm`}>
                {data.discription}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
