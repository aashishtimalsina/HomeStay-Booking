import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { navbar } from "./constants";
import { logo } from "../Constants";

const Navbar = () => {
  const location = useLocation();
  const pathnames = location.pathname;
  const [navbarOpen, setNavbarOpen] = useState(false);

  const handleToggle = () => {
    setNavbarOpen(!navbarOpen);
  };

  return (
    <nav className="flex flex-wrap items-center justify-between p-4 bg-transparent">
      <div className="flex flex-wrap items-center w-full justify-between">
        <div className="flex items-center flex-shrink-0 mr-6">
          <img src={logo} alt="logo" className=" w-8  h-10" />
        </div>
        <div className="flex  items-center ">
          <div className="hidden lg:inline-block md:flex md:justify-center md:items-center ">
            {navbar.map((text) => (
              <Link
                to={`${text.url}`}
                className={
                  text.url === pathnames
                    ? " font-bold  mr-4  text-black"
                    : "block   lg:inline-block lg:mt-0 text-gray-500 hover:text-black mr-4 font-medium "
                }
              >
                {text.label}
              </Link>
            ))}
          </div>
          <div>
            <button
              type="button"
              className="inline-flex items-center px-3 py-2 mt-4 text-sm font-medium text-white bg-gray-700 rounded-lg  hover:bg-white hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 lg:mt-0 lg:ml-4"
            >
              Log In
            </button>
          </div>
        </div>
      </div>
      <button
        onClick={handleToggle}
        className="flex items-center px-3 py-2 text-black md:hidden lg:hidden"
      >
        <svg
          className="w-3 h-3 fill-current"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>

      <div className={navbarOpen === true ? "w-full lg:w-auto " : "hidden"}>
        {navbar.map((text) => (
          <Link
            to={`${text.url}`}
            className={
              text.url === pathnames
                ? " font-bold mt-2 w-full  block   text-black bg-gray-200 "
                : "mt-2  w-full  block lg: text-gray-500 hover:text-black font-medium hover:font-bold hover:bg-gray-200"
            }
          >
            {text.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
