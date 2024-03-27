import React from "react";
import styles from "../../style";
import { useFormik } from "formik";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { signupSchema } from "../../schemas";
import webApi from "../../Config/config";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const initialValues = {
  username: "",
  email: "",
  password: "",
  conform_password: "",
};
const apiUrl = webApi.apiUrl + "/addNewUser";
const Signup = () => {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal)

  const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signupSchema,
      onSubmit: (values, action) => {
 
        axios
          .post(apiUrl, values)
          .then((response) => {
            
           if (response.status  == 200){
          
             MySwal.fire({
              icon: 'success',
              title: 'Signed Up  Successful',
             });
            
            setTimeout(() => {
              navigate('/login');
            }, 1000);

           }
              
          })
         
        action.resetForm();
      },
    });

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className={`${styles.heading2} text-white text-center mb-8`}>
        Signup
      </h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-6">
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
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.email && touched.email && (
            <p className="text-red-600">{errors.email}</p>
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

        <div className="mb-4">
          <label
            htmlFor="confirm_password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Confirm Password
          </label>
          <input
            id="conform_password"
            type="password"
            placeholder="Confirm Password"
            name="conform_password"
            value={values.conform_password}
            onChange={handleChange}
            onBlur={handleBlur}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.conform_password && touched.conform_password && (
            <p className="text-red-600">{errors.conform_password}</p>
          )}
        </div>

        <div className="flex items-center justify-center mb-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign Up
          </button>
        </div>
      </form>
      <p className="text-center mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-700 font-semibold">
          Log In
        </Link>
      </p>
    </div>
  );
};

export default Signup;
