import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Khalti from "../../Admin dasbord/components/Khalti/khalti";
import Cookies from "js-cookie";

const BookingForm = () => {
  const apiUrl = "https://moved-readily-chimp.ngrok-free.app/bookHomestay";
  const [paymentMethod, setPaymentMethod] = useState("");

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
    country: Yup.string().required("Country is required"),
    noOfGuest: Yup.number()
      .min(1, "Minimum 1 guest is required")
      .max(10, "Maximum 10 guests are allowed")
      .required("Number of guests is required"),
    contact: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    checkInDate: Yup.date()
      .required("Check-in date is required")
      .typeError("Check-in date is required"),
    checkOutDate: Yup.date()
      .required("Check-out date is required")
      .typeError("Check-out date is required"),
    specialRequest: Yup.string(),
    paymentMethod: Yup.string().required("Payment method is required"),
  });

  const calculatePrice = (values) => {
    const pricePerGuest = 2000; // Fixed price per guest
    const { noOfGuest } = values;
    return pricePerGuest * noOfGuest;
  };

  const handleFormSubmit = async (values) => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        // Handle if token is not available
        alert("Authentication token not found. Please log in.");
        return;
      }

      const encodedToken = encodeURIComponent(token);

      // Prepare the data to send including the payment method
      const dataToSend = {
        name: values.name,
        country: values.country,
        noOfGuest: values.noOfGuest,
        checkIn: values.checkInDate,
        checkOut: values.checkOutDate,
        contact: parseInt(values.contact),
        email: values.email,
        noOfRooms: parseInt(values.noOfRooms),
        specialRequest: values.specialRequest,
        guestNames: [values.guestNames],
        paymentMethod: paymentMethod, // Pass the payment method here
      };

      // Send the request with token authentication
      const response = await axios.post(apiUrl, dataToSend, {
        headers: {
          Authorization: `Bearer ${encodedToken}`,
        },
      });

      // Handle the response
      if (response.data.success) {
        alert("Booked successfully!");
      } else {
        alert(
          "The selected check-in date is not available. Please choose another date."
        );
      }
    } catch (error) {
      // Handle errors
      alert("Error booking. Please try again later.");
      console.error(error);
    }

    // Set submitting to false
    setSubmitting(false);
  };

  return (
    <div className="w-full flex justify-center">
      <Formik
        initialValues={{
          name: "",
          country: "",
          noOfGuest: "",
          checkInDate: new Date(),
          checkOutDate: new Date(),
          noOfRooms: "",
          contact: "",
          email: "",
          specialRequest: "",
          guestNames: [],
          paymentMethod: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ isSubmitting, values }) => (
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
              <p className="text-gray-500">Check In Date</p>
              <Field
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                id="checkInDate"
                name="checkInDate"
                type="date"
              />
              <ErrorMessage
                name="checkInDate"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>
            <div>
              <p className="text-gray-500">Check Out Date</p>
              <Field
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                id="checkOutDate"
                name="checkOutDate"
                type="date"
              />
              <ErrorMessage
                name="checkOutDate"
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
              id="noOfRoom"
              name="noOfRoom"
              type="number"
              placeholder="No Of Room"
            />
            <ErrorMessage
              name="noOfRoom"
              component="div"
              className="text-red-500 text-xs italic"
            />
            <Field
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="guestNames"
              name="guestNames"
              type="guestNames"
              placeholder="guestNames"
            />
            <ErrorMessage
              name="guestNames"
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
              <div onClick={() => setPaymentMethod("Khalti")}>
                <Khalti values={calculatePrice(values)} />
              </div>

              <button
                type="button"
                onClick={() => setPaymentMethod("pay on property")}
                className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Pay on property
              </button>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                onClick={handleFormSubmit}
                className="bg-blue-500 w-44 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Book Now
              </button>
            </div>
            <div className="text-gray-700 font-bold">
              Total Price: NPR {calculatePrice(values)}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BookingForm;
