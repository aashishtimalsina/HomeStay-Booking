import React, { useContext, useState } from "react";
import styles from "../../style";
import { useFormik } from "formik";
import { Loginschema } from "../../schemas";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { socialMedia } from "../Footers/constant";
import axios from "axios";
import Home from "../Home";
import LoginContex from "../../context/logincontext/CreateLoginContex";

const initialValues = {
  username: "",
  password: "",
};

const apiUrl = "https://moved-readily-chimp.ngrok-free.app/login";
const Login = () => {
  const status = useContext(LoginContex);
  const navigate = useNavigate();

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: Loginschema,
      onSubmit: (values, action) => {
        console.log(values);

        axios
          .post(apiUrl, values)
          .then((response) => {
            console.log("Response:", response.data);
            console.log("role:", response.data.role);

            if (response.data.role === "admin") {
              navigate("/admin");
            } else if (response.data.role === "user") {
              navigate("/");
              {
                status.setLoginState("true");
              }
            } else {
              // Handle the case where the role is not specified or there's an error
              console.error(
                "Role not specified or there's an error in response."
              );
              // You can navigate to an error page or display an error message here
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
        action.resetForm();
      },
    });

  return (
    <div className="Container w-[350px] items-center m-auto my-10 bg-primary-5 bg-opacity-40">
      <h1 className={`${styles.heading2} text-white pt-8`}>login</h1>
      <form
        method="POST"
        onSubmit={handleSubmit}
        className="bg-transparent shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            name="username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.username && touched.username && (
            <p className="text-red-600">{errors.username}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.password && touched.password && (
            <p className="text-red-600">{errors.password}</p>
          )}
        </div>

        <div className="flex items-center justify-center mb-5">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            login
          </button>
        </div>
        <div>
          <p className={`${styles.paragraph} text-center  `}>or login with</p>
          <div className=" flex flex-row mt-5 justify-center group ">
            {socialMedia.map((social, index) => (
              <img
                key={social.id}
                src={social.icon}
                alt={social.id}
                className={`w-[21px] h-[21] object-contain  group-hover:animate-translate cursor-pointer ${
                  index !== socialMedia.length - 1 ? "mr-6" : "mr-0"
                }`}
              />
            ))}
          </div>
        </div>
        <Link to="/signup">
          <p className={`${styles.paragraph} mt-5 text-center`}>
            Haven't Signup??
            <span className={`${styles.paragraph} text-blue-700`}>
              Sign Up
            </span>{" "}
          </p>
        </Link>
      </form>
    </div>
  );
};

export default Login;
