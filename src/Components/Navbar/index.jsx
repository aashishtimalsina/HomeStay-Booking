import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { navbar } from "./constants";
import { logoHeader } from "../Constants";
import LoginContex from "../../context/logincontext/CreateLoginContex";
import { Avatar } from "@mui/material";
import { LogoutOutlined } from "@mui/icons-material";
import Cookies from "js-cookie";

const Navbar = () => {
  const location = useLocation();
  const pathnames = location.pathname;

  const [navbarOpen, setNavbarOpen] = useState(false);
  const [status, setStatus] = useState(false);

  const handleToggle = () => {
    setNavbarOpen(!navbarOpen);
  };
  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("username");
    Cookies.remove("role");
    setStatus(false);
  };
  const token = Cookies.get("token");
  const role = Cookies.get("role");

  useEffect(() => {
    if (token != undefined) {
      setStatus(true);
    }
  }, [token, status]);
  return (
    <nav className="flex flex-wrap items-center w-full justify-between p-2 z-10  ">
      <div className="flex flex-wrap items-center w-full justify-between">
        <div className="flex items-center flex-shrink-0 mr-6">
          {/* <img src={logo} alt="logo" className=" w-15 h-14" /> */}
          <img src={logoHeader} alt="logo" className="w-24 h-22" />      
            </div>
        <div className="flex bg-transparent items-center ">
          <div className="hidden lg:inline-block bg-transparent md:flex md:justify-center md:items-center ">
            {navbar.map((text) => (
              <Link
                to={`${text.url}`}
                key={text.id}
                className={
                  text.url === pathnames
                    ? "  mr-4  text-primary-1 font-medium text-lg underline underline-offset-2"
                    : "block   lg:inline-block lg:mt-0 text-black hover:text-lg   mr-4 font-normal "
                }
              >
                {text.label}
              </Link>
            ))}
          </div>
          <div className="flex justify-center items-center text-center">
            {status ? (
              <div className="flex justify-center items-center text-center">
                <Link to="#">
                  <Avatar
                    alt="Remy Sharp"
                    src="/static/images/avatar/1.jpg"
                    sx={{
                      height: "30px",
                      width: "30px",
                      margin: "auto",
                      bgcolor: "#3A7198",
                      color: "#fffff",
                    }}
                    style={{ cursor: "pointer" }}
                  />
                </Link>
                <Link to="/">
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-primary-3 bg-transparent rounded-lg hover:bg-white hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-700"
                    onClick={logout}
                  >
                    <LogoutOutlined />
                  </button>
                </Link>
              </div>
            ) : (
              <div className="flex justify-center align-center text-center">
                <Link to="/login">
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-2 mt-4 text-sm font-medium text-primary-3 bg-transparent rounded-lg hover:bg-white hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-700 lg:mt-0 "
                  >
                    Log In
                  </button>
                </Link>
                <Link to="/signup">
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-2 mt-4 text-sm font-medium text-white bg-black  rounded-lg  hover:bg-white hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all  duration-700 lg:mt-0 lg:ml-4"
                  >
                    Signup
                  </button>
                </Link>
                <button
                  onClick={handleToggle}
                  className="flex items-center m-auto ml-2 mt-5  px-3 py-2 text-white bg-black bg-opacity-15 rounded-full md:hidden lg:hidden"
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
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className={
          navbarOpen === true
            ? "w-full lg:w-auto bg-white  bg-opacity-45 p-5"
            : "hidden"
        }
      >
        {navbar.map((text) => (
          <Link
            to={`${text.url}`}
            className={
              text.url === pathnames
                ? " z-10 font-bold mt-2 w-full  block text-black underline"
                : "mt-2 z-20  w-full  block lg:text-black text-black hover:underline font-medium hover:font-bold"
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
