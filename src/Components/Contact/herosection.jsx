import React, { useState } from "react";
import { activityimage3 } from "../Constants";
import styles from "../../style";
import { useFormik } from "formik";
import { contactschema } from "../../schemas";
import webApi from "../../Config/config";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content'


const apiUrls = webApi.apiUrl;
const MySwal = withReactContent(Swal)

const initialValues = {
  name: "",
  email: "",
  message: "",
};

const Herosection = () => {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: contactschema,
      onSubmit: async (values, action) => {
        try {
          const response = await fetch(apiUrls+"/saveContact",
            {
              method: "POST",
              headers: {
                "ngrok-skip-browser-warning": true,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username: values.name,
                email: values.email,
                message: values.message,
              }),
            }
          );

          if (response.ok) {
            setSubmitSuccess(true);
            setSubmitError(null);
            action.resetForm();

            return MySwal.fire({
              icon: 'success',
              title: 'Contact Form Submitted Successfully',
              showConfirmButton: false,
              timer: 1500
             });
          } else {
            setSubmitSuccess(false);
            setSubmitError("Failed to submit the form");
          }
        } catch (error) {
          setSubmitSuccess(false);
          setSubmitError("An error occurred while submitting the form");
          console.error("Error:", error);
        }
      },
    });

  return (
    <div className="flex">
      <div className="w-full md:w-1/2 flex items-center">
        <div className="max-w-lg w-full mx-auto p-6">
          <h2 className="text-2xl font-semibold mb-6">Contact Us</h2>
          {submitSuccess && (
            <p className="text-green-500 mb-4">Contact Form submitted successfully! Stay tuned!</p>
          )}
          {submitError && <p className="text-red-500 mb-4">{submitError}</p>}

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
