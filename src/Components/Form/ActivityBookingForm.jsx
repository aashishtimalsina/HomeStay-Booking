import React, { useEffect, useState } from "react";
 import * as Yup from "yup";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import khalti from "../../assets/khalti.png";
import Khalti from "../../Admin dasbord/components/Khalti/khalti";
import webApi from "../../Config/config";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content'
import KhaltiCheckout from "khalti-checkout-web";
import config from "../../Admin dasbord/components/Khalti/khaltiConfig";
import Cookies from "js-cookie";

const ActivityBookingForm = () => {
  const checkout = new KhaltiCheckout(config); // Initialize outside rendering

  const MySwal = withReactContent(Swal)

  const [serverError, setServerError] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [noOfGuest, setNoOfGuest] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("unpaid");
  const [pricePerGuest, setPricePerGuest] = useState(0);

    const calculatePrices = (noOfGuest) => {
    setTotalPrice( pricePerGuest * noOfGuest );     
};
const handleClick = (e) => {
  e.preventDefault();
  checkout.show({ amount:totalPrice *100}); 
  setPaymentMethod("Khalti")
  handleFormSubmit(e); 
};

  const apiUrl = webApi.apiUrl;
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
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
    country: Yup.string().required("Country is required"),
    noOfGuest: Yup.number()
      .min(1, "Minimum 1 guest is required")
      .max(10, "Maximum 4 guests are allowed")
      .required("Number of guests is required"),
      contact: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    date: Yup.date()
      .min(new Date(), " Date should be today or later")
      .required(" Date is required")
      .typeError("Date is required"),
    
  });

  const handleFormSubmit = (values, { setSubmitting }) => {
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
      date: values.date,
      paymentStatus: paymentMethod =="unpaid"?"No Payment":"paid",
      noOfRooms: parseInt(values.noOfRooms),
      paymentMethod: paymentMethod,
      specialRequest: values.specialRequest,
      contact: parseInt(values.contact),
    };
    axios
      .post(apiUrl+"/bookActivities", dataToSend,{
        headers: {
          "ngrok-skip-browser-warning": true,
          Authorization: `Bearer ${encodedToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
       
          // Handle successful response
          return MySwal.fire({
            icon: 'success',
            title: 'Your hike has been booked successfully.!',
           });
           setSubmitting(false);
        
      })
      .catch((error) => {
        return MySwal.fire({
          icon: 'error',
          title: "Please enter a valid date or phone number and verify the guest and number of guest ",
         });
      });
  };
  const fetchDetail = async () => {
    
    try {
      const token = Cookies.get("token");
    if (!token) {
      alert("Authentication token not found. Please log in.");
      return;
    }
    const encodedToken = encodeURIComponent(token);
      const response = await axios.get(
        apiUrl+"/getHomeStayInfo/1",
        {
          headers: {
            "ngrok-skip-browser-warning": true,
            Authorization: `Bearer ${encodedToken}`,
            "Content-Type": "application/json",
          },
        }
      );
        if (response.data) {
          setPricePerGuest(response.data.homestay_details.price);
          calculatePrices;
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
  return (
    <div className="w-full  p-10">
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
            <Field
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="noOfGuest"
              name="noOfGuest"
              type="number"
              onchange={calculatePrices(values.noOfGuest)}
               placeholder="Number of Guests"
            />
            <ErrorMessage
              name="noOfGuest"
              component="div"
              className="text-red-500 text-xs italic"
            />
            <div>
              <p className="text-gray-500"> Date</p>
              <Field
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                id="date"
                name="date"
                type="date"
              />
              <ErrorMessage
                name="date"
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
          
            <Field
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="specialRequest"
              name="specialRequest"
              type="text"
              placeholder="Special request (optional)"
            />
           
            <div className="flex justify-between">
               <button
                    onClick={handleClick}
                    className=" bg-primary-7 hover:bg-white hover:text-primary-7 text-white transition-all duration-700  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Pay Via Khalti
                  </button>
 
              <button
                type="button"
                onClick={()=>{setPaymentMethod("Property")}}
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

export default ActivityBookingForm;
