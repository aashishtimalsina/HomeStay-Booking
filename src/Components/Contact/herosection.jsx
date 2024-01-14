import React, { useState } from "react";
import { activityimage3 } from "../Constants";
import Navbar from "../Navbar";
import styles from "../../style";
import { useFormik } from "formik";
import { contactschema } from "../../schemas";

const initialValues = {
  name: "",
  email: "",
  message: "",
};
const Herosection = () => {
  const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: contactschema,
      onSubmit: (values, action) => {
        console.log(values);
        action.resetForm();
      },
    });

  return (
    <>
      <div
        className="  flex flex-col bg-cover bg-center  w-full h-full lg:h-screen"
        style={{
          backgroundImage: `url(${activityimage3})`,
        }}
      >
        <div className=" bg-black bg-opacity-35 h-full w-full">
          <Navbar />
          <div className="lg:w-3/5 w-custom  flex justify-center h-full items-center m-auto my-5">
            <h2 className={`${styles.heading2} text-white  `}> CONTACT US</h2>
          </div>
        </div>
      </div>
      <div className="max-w-md  w-10/12 mb-14 mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-6">Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-600 text-sm font-medium"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="name"
              value={values.name}
              onBlur={handleBlur}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
            <p>
              {errors.name && touched.name && (
                <p className="text-red-600">{errors.name}</p>
              )}
            </p>
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-600 text-sm font-medium"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
            {errors.email && touched.email && (
              <p className="text-red-600">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-gray-600 text-sm font-medium"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={values.message}
              onChange={handleChange}
              onBlur={handleBlur}
              rows="4"
              className="mt-1 p-2 w-full border rounded-md"
              required
            ></textarea>
            {errors.message && touched.message && (
              <p className="text-red-600">{errors.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Herosection;
