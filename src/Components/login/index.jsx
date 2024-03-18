import React, { useContext } from "react";
import { useFormik } from "formik";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { socialMedia } from "../Footers/constant";
import axios from "axios";
import Cookies from "js-cookie";
import LoginContex from "../../context/logincontext/CreateLoginContex";
import styles from "../../style";
import { Loginschema } from "../../schemas";
import webApi from '../../Config/config'

const initialValues = {
  username: "",
  password: "",
};

const apiUrl = webApi.apiUrl + "/login";

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
            console.log("Response:", response);
            console.log("role:", response.data.role);

            if (response.data.role === "admin") {
              Cookies.set("token", response.data.token, { expires: 1 }); 
              Cookies.set("username", response.data.username, { expires: 1 }); 
              navigate("/admin");
            } else if (response.data.role === "user") {
              Cookies.set("token", response.data.token, { expires: 1 }); 
              Cookies.set("username", response.data.username, { expires: 1 }); 
              navigate("/");
              status.setLoginState("true");
            } else {
              console.error(
                "Role not specified or there's an error in response."
              );
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
        action.resetForm();
      },
    });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className={`${styles.heading2} text-center`}>Login</h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Username"
              name="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.username && touched.username && (
              <p className="text-red-600">{errors.username}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.password && touched.password && (
              <p className="text-red-600">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-center mb-5">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </div>
        </form>
        <Link to="/signup">
          <p className={`${styles.paragraph} text-center`}>
            Haven't signed up yet?{" "}
            <span className="text-blue-700 font-semibold">Sign Up</span>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Login;
