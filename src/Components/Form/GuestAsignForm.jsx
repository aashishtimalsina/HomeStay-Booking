import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const FormSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  noOfPax: Yup.number().required("Number of passengers is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  hostName: Yup.string().required("Amount to pay is required"),
});

const GuestAsignForm = () => {
  const handleSubmit = async (values, actions) => {
    try {
      // Make API call here
      const response = await fetch("your-api-endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      console.log("Form submitted successfully:", values);
      actions.resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className="my-10 w-full flex justify-center  items-center m-auto  ">
      <div>
        <h2 className="text-2xl font-bold mb-4">Guest Information</h2>
        <Formik
          initialValues={{
            name: "",
            email: "",
            noOfPax: "",
            phoneNumber: "",
            hostName: "",
            amount: "",
            phone: "",
            email: "",
          }}
          validationSchema={FormSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="">
              <div className="flex flex-wrap w-full ">
                <div className="mb-4 w-1/2 ">
                  <label
                    htmlFor="name"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Guest Name
                  </label>
                  <Field
                    name="name"
                    type="text"
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      errors.name && touched.name ? "border-red-500" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>
              <div className="flex flex-wrap w-full ">
                <div className="mb-4 mr-4">
                  <label
                    htmlFor="noOfPax"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Number of Passengers
                  </label>
                  <Field
                    name="noOfPax"
                    type="number"
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      errors.noOfPax && touched.noOfPax ? "border-red-500" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="noOfPax"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="phoneNumber"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Phone Number
                  </label>
                  <Field
                    name="phoneNumber"
                    type="tel"
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      errors.phoneNumber && touched.phoneNumber
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>
              <div className="flex flex-wrap w-full">
                <div className="mb-4 mr-4">
                  <label
                    htmlFor="hostName"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    HostName
                  </label>
                  <Field
                    name="hostName"
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      errors.hostName && touched.hostName
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="hostName"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="mb-4 ">
                  <label
                    htmlFor="amount"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Amount
                  </label>
                  <Field
                    name="amount"
                    type="number"
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      errors.amount && touched.amount ? "border-red-500" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="amount"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>
              <div className="flex flex-wrap w-full">
                <div className="mb-4 mr-4">
                  <label
                    htmlFor="phone"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Phone
                  </label>
                  <Field
                    name="phone"
                    type="tel"
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      errors.phone && touched.phone ? "border-red-500" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Email
                  </label>
                  <Field
                    name="email"
                    type="email"
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      errors.email && touched.email ? "border-red-500" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>
              <div className="mb-4">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default GuestAsignForm;
