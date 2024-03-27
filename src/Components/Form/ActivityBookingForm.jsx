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
import { useNavigate, useParams } from "react-router-dom";

const ActivityBookingForm = (props) => {
  const {Ids  }= props;
    const checkout = new KhaltiCheckout(config); // Initialize outside rendering
    const MySwal = withReactContent(Swal)

  const [serverError, setServerError] = useState("");
  const [noOfGuest, setNoOfGuest] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [activity, setActivity] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [perGuest, setPerGuest] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);  
   const [checkInDate,SetCheckInDate]=useState(null);
   const [checkOutDate,SetCheckOutDate]=useState(null);
   const [totalStayDuration,SetTotalStayDuration]=useState(0);

 
const handleClick = (e) => {
  e.preventDefault();
  checkout.show({ amount:totalPrice *100}); 
  if(Cookies.get('paymentStatus') == 'Success'){
    setPaymentMethod("Khalti")
    setIsClicked(true)
  }

};

  const apiUrl = webApi.apiUrl;
  const navigate =useNavigate()

  const initialValues = {
    name: "",
    country: "",
    noOfGuest: "",
    date: null,
    contact: null,
    email: "",
    specialRequest: "",
    guestNames: [""],
    paymentMethods: "",
    paymentStatus: "",
  };
  const [validationSchema,setValidateSchema] = useState(Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
      
      paymentMethods: paymentMethod || Cookies.get('paymentStatus') == 'Success'
      ? Yup.string()
      : Yup.string().required('Payment should be done to continue booking')
     ,
    country: Yup.string().required("Country is required"),
    contact: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    date: Yup.date()
      .required("Check-in date is required")
      .typeError("Check-in date is required"),
    specialRequest: Yup.string(),
     guestNames: Yup.array()
      .of(Yup.string().required("Guest name is required"))
      .min(1, "At least one guest name is required")
      .required("Guest names are required"),
      paymentStatus: 
      Yup.string().nullable(),
    
     
  }));

  const handleFormSubmit = async (values) => {
    if(Cookies.get('paymentStatus') == 'Success'){
      setPaymentMethod("Khalti")
      setIsClicked(true)
    }
    try {
      const token = Cookies.get("token");
      if (token  =="undefined" ) {
      navigate('/login')
        return;
      }

      const encodedToken = encodeURIComponent(token);

       const dataToSend = {
        name: values.name,
        noOfGuest: values.noOfGuest,
        country: values.country,
        email: values.email,
        date: values.date,
         paymentMethod: paymentMethod,
        totalAmount:totalPrice.toFixed(2),  
        specialRequest: values.specialRequest,
        contact: parseInt(values.contact),
        paymentStatus:'confirmed' ,
        bookingStatus:'confirmed',
       };
      await axios.post(
        apiUrl+"/bookActivities",
        dataToSend,
        {
          headers: {
            "ngrok-skip-browser-warning": true,
            Authorization: `Bearer ${encodedToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      Cookies.remove('paymentStatus'); 
        return MySwal.fire({
          icon: 'success',
          title: 'Booking  Successful',
         });
        // setServerError("");
      
    } catch (error) {
      // Handle errors
      
     if(error.status_code== 400){
      return MySwal.fire({
        icon: 'error',
        title: 'Requested rooms are not available for the given dates.',
       });
     }else{
      return MySwal.fire({
        icon: 'error',
        title: 'Please enter a valid date or phone number and verify the guest and number of guest .',
       });
     }
    }

    };
    const   PropertySubmit =()=>{
      setIsClicked(true);
      setPaymentMethod("Property")
    }
 
  const changeguest=(value)=>{
    setNoOfGuest(value); 
     calculatePrices(value);
  }
 function calculatePrices(noOfGuest) {
     
         setTotalPrice( perGuest * noOfGuest );
      
     
          
    }
    
  function changeCheckInDate(event) {
     SetCheckInDate(event);
  
  }
  useEffect(() => {
    const interval = setInterval(() => {
       const paymentStatus = Cookies.get('paymentStatus');
      if (paymentStatus === 'Success') {
        setPaymentMethod("Khalti");
        setIsClicked(true);
        console.log('ok');
      } else if (paymentStatus === 'Error') {
        console.log('Error');
      }
    }, 2000); // 200 seconds
  
    // Clear the interval when the component unmounts or when the dependencies change
    return () => clearInterval(interval);
  }, []); 
  useEffect(() => {
    Cookies.remove('paymentStatus'); 
    const fetchData = async () => {
       const apiUrl = webApi.apiUrl + '/getActivityDetail/'+Ids;


    
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            "ngrok-skip-browser-warning": true,
          },
        });
        if (response.data) {
           setActivity(response.data.activity_details || null);
           setPerGuest(response.data.activity_details.price ||null)
        } else {
          console.error("Empty response data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [Ids]);
   useEffect(() => {
    setValidateSchema(
      Yup.object({
        name: Yup.string()
          .min(3, "Name must be at least 3 characters")
          .required("Name is required"),
          
          paymentMethods: paymentMethod || Cookies.get('paymentStatus') == 'Success'
          ? Yup.string()
          : Yup.string().required('Payment should be done to continue booking')
         ,
        country: Yup.string().required("Country is required"),
        contact: Yup.string()
          .matches(/^\d{10}$/, "Phone number must be 10 digits")
          .required("Phone number is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        date: Yup.date()
          .required("Check-in date is required")
          .typeError("Check-in date is required"),
        specialRequest: Yup.string(),
          paymentStatus: 
          Yup.string().nullable(),
        
         
      })
    )
    
   }, [paymentMethod])
  return (
    <div className="w-full  p-10">
    
   <div className="w-full flex justify-center">
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
      >
        {({ isSubmitting, values }) => (
          <Form className="flex flex-col space-y-4 w-96 justify-center m-auto my-20 bg-white p-10 rounded-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Activities Booking Form</h2>

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
              value={noOfGuest}
              type="number"
              onchange={changeguest(values.noOfGuest)}
               placeholder="Number of Guests"
            />
            <ErrorMessage
              name="noOfGuest"
              component="div"
              className="text-red-500 text-xs italic"
            />
            <div>
              <p className="text-gray-500">Check In Date</p>
              <Field
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                id="date"
                name="date"
                value={checkInDate}
                onchange={changeCheckInDate(values.date)}
                type="date"
              />
              <ErrorMessage
                name="checkIn"
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
              <ErrorMessage
              name="paymentMethods"
              component="div"
              className="text-red-500 text-xs italic"
            />
            <Field
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="paymentMethods"
              name="paymentMethods"
              value={paymentMethod}
              type="hidden"
             />
          
            <div className="flex justify-between">
            {isClicked ? (
  <span>
    {paymentMethod === "Property" ? "Paid with Property" :
    paymentMethod === "Khalti" ? "Paid with Khalti" : ""}
  </span>
) : (
  <>
    <button
      onClick={handleClick}
      className="bg-primary-7 hover:bg-white hover:text-primary-7 text-white transition-all duration-700 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Pay Via Khalti
    </button>
    <button
      onClick={PropertySubmit}
      className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Pay on Property
    </button>
  
    </> 
 )}

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
    </div>
  );
};

export default ActivityBookingForm;
