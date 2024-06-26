import React from "react";

const Button = (props) => {
  return (
    <div
      className=" flex justify-center "
      style={{
        width: ` ${props.width}`,
      }}
    >
      <button
        type="button"
        className={`py-2.5 w-full  px-5 me-2 mb-2 text-sm font-medium text-white focus:outline-none bg-primary-1 rounded-lg border border-gray-200  hover:text-primary-1 hover:bg-white focus:z-10 focus:ring-4 focus:ring-gray-200 transition-all duration-1000`}
      >
        {props.name}
      </button>
    </div>
  );
};

export default Button;
