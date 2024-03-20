import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Khalti from "../../Admin dasbord/components/Khalti/khalti";
import Cookies from "js-cookie";
import webApi from "../../Config/config";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content'

const BookingForm = () => {

  const [paymentMethod, setPaymentMethod] = useState("");
  const [serverError, setServerError] = useState("");
  const [pricePerGuest, setPricePerGuest] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [noOfGuest, setNoOfGuest] = useState(1);

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
    checkIn: Yup.date()
      .required("Check-in date is required")
      .typeError("Check-in date is required"),
    checkOut: Yup.date()
      .required("Check-out date is required")
      .typeError("Check-out date is required"),
    specialRequest: Yup.string(),
    noOfRooms: Yup.number()
      .min(1, "Minimum 1 room is required")
      .max(10, "Maximum 10 rooms are allowed")
      .required("Number of rooms is required"),
    paymentMethod: Yup.string().required("Payment method is required"),
    guestNames: Yup.array()
      .of(Yup.string().required("Guest name is required"))
      .min(1, "At least one guest name is required")
      .required("Guest names are required"),
      paymentStatus: Yup.array()
      .of(Yup.string().nullable())
     
  });
  const fetchDetail = async () => {
    try {
      const response = await axios.get(
        apiUrl+"/getHomeStayInfo/1",
        {
          headers: {
            "ngrok-skip-browser-warning": true,
          },
        }
      );
      console.log(response.data);
       if (response.data) {
        console.log(response.data.homestay_details.price);
         setPricePerGuest(response.data.homestay_details.price);
      
      } else {
        console.error("Empty response data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchDetail();
  }, []);
  const calculatePrices = () => {
        
       setTotalPrice( pricePerGuest * noOfGuest);
  };

  const initialValues = {
    name: "",
    country: "",
    noOfGuest: 0,
    checkIn: null,
    checkOut: "",
    noOfRooms: 0,
    contact: null,
    email: "",
    specialRequest: "",
    guestNames: [""],
    paymentMethod: "",
    paymentStatus: "",
  };
  const apiUrl = webApi.apiUrl ;
  const MySwal = withReactContent(Swal)

  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        alert("Authentication token not found. Please log in.");
        return;
      }

      const encodedToken = encodeURIComponent(token);

       const dataToSend = {
        name: values.name,
        noOfGuest: values.noOfGuest,
        country: values.country,
        email: values.email,
        checkIn: values.checkIn,
        checkOut: values.checkOut,
        noOfRooms: parseInt(values.noOfRooms),
        paymentMethod: values.paymentMethod,
        specialRequest: values.specialRequest,
        contact: parseInt(values.contact),
        paymentStatus:'paid/.' ,
        guestNames: values.guestNames,
      };

      const response = await axios.post(
        apiUrl+"/bookHomestay",
        dataToSend,
        {
          headers: {
            "ngrok-skip-browser-warning": true,
            Authorization: `Bearer ${encodedToken}`,
            "Content-Type": "application/json",
          },
        }
      );
       if (response.status_code ==200) {
        return MySwal.fire({
          icon: 'success',
          title: 'Review Deleted Successful',
         });
        setServerError("");
      } else {
        setServerError(
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
  
   Cookies.remove("redirectTo");
    return (
    <div className="w-full flex justify-center">
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
      >
        {({ isSubmitting, values }) => (
          <Form className="flex flex-col space-y-4 w-96 justify-center m-auto my-20 bg-white p-10 rounded-md">
            {serverError && (
              <div className="text-red-500 text-xs italic">{serverError}</div>
            )}
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
            {/* <Field
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="noOfGuest"
              name="noOfGuest"
              type="number"
              onchange={totalPrice()}
               placeholder="Number of Guests"
            /> */}
            <ErrorMessage
              name="noOfGuest"
              component="div"
              className="text-red-500 text-xs italic"
            />
            <div>
              <p className="text-gray-500">Check In Date</p>
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
              <p className="text-gray-500">Check Out Date</p>
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
              id="noOfRooms"
              name="noOfRooms"
              type="number"
              placeholder="Number of Rooms"
            />
            <ErrorMessage
              name="noOfRooms"
              component="div"
              className="text-red-500 text-xs italic"
            />
            <FieldArray name="guestNames">
              {({ push, remove, form }) => (
                <div>
                  {form.values.guestNames.map((_, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 mb-2"
                    >
                      <Field
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                        name={`guestNames.${index}`}
                        type="text"
                        placeholder={`Guest Name ${index + 1}`}
                      />
                      {index > 0 && (
                        <button
                          type="button"
                            onClick={() => {
                            remove(index)
                            setNoOfGuest(noOfGuest - 1)
                            calculatePrices();
                         }}
                          className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      push("");
                      setNoOfGuest(noOfGuest + 1);
                      calculatePrices();
                    }}
                    className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Add Guest
                  </button>
                </div>
              )}
            </FieldArray>
            <Field
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="specialRequest"
              name="specialRequest"
              type="text"
              placeholder="Special request (optional)"
            />
            <Field
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="paymentMethod"
              name="paymentMethod"
              type="text"
              placeholder="paymentMethod"
            />
            <div className="flex justify-between">
              <div onClick={() => setPaymentMethod("Khalti")}>
                <Khalti values={totalPrice} />
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
                className="bg-blue-500 w-44 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                // disabled={isSubmitting}
              >
                Book Now
              </button>
            </div>
            <div className="text-gray-700 font-bold">
              Total Price: NPR {totalPrice}
            </div> 
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BookingForm;
