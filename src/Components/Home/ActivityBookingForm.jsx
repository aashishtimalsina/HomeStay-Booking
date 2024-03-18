import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import webApi from "../../Config/config";

const ActivityBookingForm = () => {
  const apiUrl = webApi.apiUrl + "/addNewActivity?fbclid=IwAR0yc5pu5P9BVqNQaZnyqs-a0YJUaJuMXchALYVPC-i0-CDK1q66P9imt7M";

  // const apiUrl =
  //   "https://c23a-2400-1a00-b060-8b27-90e7-4323-28d6-9cf6.ngrok-free.app/addNewActivity?fbclid=IwAR0yc5pu5P9BVqNQaZnyqs-a0YJUaJuMXchALYVPC-i0-CDK1q66P9imt7M";

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <Formik
        initialValues={{
          guests: 1,
          date: new Date(),
        }}
        validationSchema={Yup.object({
          guests: Yup.number()
            .min(1, "Minimum 1 guest is required")
            .max(10, "Maximum 10 guests are allowed")
            .required("Number of guests is required"),
          date: Yup.date()
            .min(new Date(), "Date should be today or later")
            .required("Date is required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          axios
            .post(apiUrl, values)
            .then((response) => {
              if (response.data.success) {
                alert("Activity booked successfully!");
                setSubmitting(false);
              } else {
                alert("Failed to book activity. Please try again later.");
                setSubmitting(false);
              }
            })
            .catch((error) => {
              console.error("Error:", error);
              alert("Failed to book activity. Please try again later.");
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form className="p-6">
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              Book Activity
            </h2>
            <div className="mb-4">
              <label
                htmlFor="guests"
                className="block text-gray-700 font-medium mb-1"
              >
                Number of Guests
              </label>
              <Field
                type="number"
                name="guests"
                id="guests"
                className="form-input w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                min="1"
                max="10"
              />
              <ErrorMessage
                name="guests"
                component="p"
                className="text-red-500 text-xs italic"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="date"
                className="block text-gray-700 font-medium mb-1"
              >
                Date
              </label>
              <Field name="date">
                {({ field, form }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={(date) => form.setFieldValue("date", date)}
                    dateFormat="yyyy-MM-dd"
                    className="form-input w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  />
                )}
              </Field>
              <ErrorMessage
                name="date"
                component="p"
                className="text-red-500 text-xs italic"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-200 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ActivityBookingForm;
