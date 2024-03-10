import React, { useState } from "react";
import { activityimage3 } from "../Constants";
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
    <div className="flex">
      <div className="w-full md:w-1/2 flex items-center">
        <div className="max-w-lg w-full mx-auto p-6">
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
                className="mt-1 p-3 w-full border rounded-md"
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
                className="mt-1 p-3 w-full border rounded-md"
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
                rows="6"
                className="mt-1 p-3 w-full border rounded-md"
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
      </div>
      <div className="w-full md:w-1/2 items-center flex justify-center">
        <img
          src={activityimage3}
          alt="Activity"
          className="w-full h-auto max-w-md mx-auto"
        />
      </div>
    </div>
  );
};

export default Herosection;
