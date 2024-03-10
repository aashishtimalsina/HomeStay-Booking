import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
// import khalti from "../../assets/khalti.png";
import Khalti from "../../Admin dasbord/components/Khalti/khalti";

const BookingForm = () => {
  const apiUrl = "https://moved-readily-chimp.ngrok-free.app/bookActivities"; 
  
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
    country: Yup.string().required("Country is required"),
    noOfPax: Yup.number()
      .min(1, "Minimum 1 guest is required")
      .max(10, "Maximum 4 guests are allowed")
      .required("Number of guests is required"),
    contact: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    checkInDate: Yup.date()
      // .min(new Date(), "Check-in date should be today or later")
      .required("Check-in date is required")
      .typeError("Check-in date is required"),
    checkOutDate: Yup.date()
      // .min(Yup.ref("checkInDate"), "Check-out date must be after check-in date")
      .required("Check-out date is required")
      .typeError("Check-out date is required"),
    specialRequest: Yup.string(),
    paymentMethod: Yup.string().required("Payment method is required"),
  });

  const handleFormSubmit = (values, { setSubmitting }) => {
    axios
      .post(apiUrl, values)
      .then((response) => {
        if (response.data.success) {
          // Handle successful response
          alert("Your hike has been booked successfully!");
          setSubmitting(false);
        } else {
          // Handle unavailable date
          alert(
            "The selected check-in date is not available. Please choose another date."
          );
          setSubmitting(false);
        }
      })
      .catch((error) => {
        // Handle error response
        alert("Error booking your hike. Please try again later.");
        console.error(error);
        setSubmitting(false);
      });
  };

  return (
    <div className="w-full flex justify-center">
      <Formik
        initialValues={{
          name: "",
          country: "",
          noOfPGuest: "",
          checkIn: new Date(),
          checkOut: new Date(),
          contact: "",
          email: "",
          specialRequest: "",
          paymentMethod: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col space-y-4 w-96 justify-center m-auto my-20 bg-white p-10 rounded-md">
            <Field
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="name"
              name="name"
              type="text"
              placeholder="Name"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-xs italic"
            />
            <Field
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="country"
              name="country"
              type="text"
              placeholder="Country"
            />
            <ErrorMessage
              name="country"
              component="div"
              className="text-red-500 text-xs italic"
            />
            <Field
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="noOfGuest"
              name="noOfGuest"
              type="number"
              placeholder="Number of pax"
            />
            <div>
              <p className=" text-gray-500"> Check In Date</p>
              <Field
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                id="checkIn"
                name="checkIn"
                type="date"
              />
              <ErrorMessage
                name="checkIn"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>
            <div>
              <p className=" text-gray-500"> Check Out Date</p>
              <Field
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                id="checkOut"
                name="checkOut"
                type="date"
              />
              <ErrorMessage
                name="checkOut"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>
            <Field
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="contact"
              name="contact"
              type="text"
              placeholder="Phone number"
            />
            <ErrorMessage
              name="contact"
              component="div"
              className="text-red-500 text-xs italic"
            />
            <Field
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="email"
              name="email"
              type="email"
              placeholder="Email"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-xs italic"
            />
            <Field
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="specialRequest"
              name="specialRequest"
              type="text"
              placeholder="Special request (optional)"
            />
            <div className="flex justify-between">
              <button
                type="submit"
                disabled={isSubmitting}
                id="paymentMethod"
                name="paymentMethod"
              >
                <img src={khalti} alt="khalti payment" className="h-12 w-26" />
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {isSubmitting ? "Submitting..." : "Pay on property"}
              </button>
            </div>
            <div className="flex justify-center">
              <button className="bg-blue-500 w-44 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Book Now
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BookingForm;