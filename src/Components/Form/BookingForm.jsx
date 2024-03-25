import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray, useFormikContext } from "formik";
import * as Yup from "yup";
import axios from "axios";
// import Khalti from "../../Admin dasbord/components/Khalti/khalti";
import Cookies from "js-cookie";
import webApi from "../../Config/config";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content'
import KhaltiCheckout from "khalti-checkout-web";
import config from "../../Admin dasbord/components/Khalti/khaltiConfig";
import { useNavigate } from "react-router-dom";

const BookingForm = () => {
  const checkout = new KhaltiCheckout(config); // Initialize outside rendering

  const handleClick = (e) => {
    e.preventDefault();
    checkout.show({ amount:totalPrice *100}); 
    setPaymentMethod("Khalti")
    setIsClicked(true)
   };


   const [serverError, setServerError] = useState("");
   const [paymentMethod, setPaymentMethod] = useState(null);
  const [pricePerGuest, setPricePerGuest] = useState(0);
  const [noOfGuest, setNoOfGuest] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);  
   const [isClicked, setIsClicked] = useState(false);
   const [checkInDate,SetCheckInDate]=useState(null);
   const [checkOutDate,SetCheckOutDate]=useState(null);
   const [totalStayDuration,SetTotalStayDuration]=useState(0);

 
  const [validationSchema,setValidateSchema] = useState(Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
      
      paymentMethods: paymentMethod
      ? Yup.string()
      : Yup.string().required('Payment should be done to continue booking')
     ,
    country: Yup.string().required("Country is required"),
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
     guestNames: Yup.array()
      .of(Yup.string().required("Guest name is required"))
      .min(1, "At least one guest name is required")
      .required("Guest names are required"),
      paymentStatus: 
      Yup.string().nullable(),
    
     
  }));
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
        Cookies.remove("redirectTo");
    fetchDetail();
    
    
  });
 const changeguest=(value)=>{
  setNoOfGuest(value); 
   calculatePrices(  totalStayDuration , value );
}
  function calculatePrices(duration,noOfGuest) {
    console.log(duration);
       setTotalPrice( pricePerGuest * duration * noOfGuest );
    
   
        
  }

  const initialValues = {
    name: "",
    country: "",
    noOfGuest: "",
    checkIn: null,
    checkOut: "",
    noOfRooms: "",
    contact: null,
    email: "",
    specialRequest: "",
    guestNames: [""],
    paymentMethods: "",
    paymentStatus: "",
  };
  const apiUrl = webApi.apiUrl ;
  const MySwal = withReactContent(Swal)
  const navigate =useNavigate()

  const handleFormSubmit = async (values) => {

    try {
      const token = Cookies.get("token");
      if (token  =="undefined" ) {
      navigate('/login')
        return;
      }

      const encodedToken = encodeURIComponent(token);

       const dataToSend = {
        name: values.name,
        noOfGuest: values.guestNames.length,
        country: values.country,
        email: values.email,
        checkIn: values.checkIn,
        checkOut: values.checkOut,
        noOfRooms: parseInt(values.noOfRooms),
        paymentMethod: paymentMethod,
        totalAmount:totalPrice.toFixed(2),  
        specialRequest: values.specialRequest,
        contact: parseInt(values.contact),
        paymentStatus:'paid' ,
        guestNames: values.guestNames,
      };
      await axios.post(
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
  function calculateTotalStayDuration  (checkInDate,checkOutDate)  {
    const dt1 = new Date(checkInDate);
  const dt2 = new Date(checkOutDate);
  const diff= Math.floor(
    (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
      Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
      (1000 * 60 * 60 * 24)
  );
  calculatePrices(diff,noOfGuest)
  
SetTotalStayDuration(diff);


}
function changeCheckInDate(event) {
   SetCheckInDate(event);
   if(checkOutDate){
   calculateTotalStayDuration(event,checkOutDate);
 }
}
function changeCheckOutDate(event) {
  SetCheckOutDate(event)
    if(checkInDate ){
     calculateTotalStayDuration(checkInDate,event);
  }
}
 useEffect(() => {
  setValidateSchema(
    Yup.object({
      name: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .required("Name is required"),
        
        paymentMethods: paymentMethod
        ? Yup.string()
        : Yup.string().required('Payment should be done to continue booking.')
       ,
      country: Yup.string().required("Country is required"),
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
       guestNames: Yup.array()
        .of(Yup.string().required("Guest name is required"))
        .min(1, "At least one guest name is required")
        .required("Guest names are required"),
        paymentStatus: 
        Yup.string().nullable(),
      
       
    })
  )
 }, [paymentMethod])
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
                id="checkIn"
                name="checkIn"
                value={checkInDate}
                onchange={changeCheckInDate(values.checkIn)}
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
                value={checkOutDate}
                onchange={changeCheckOutDate(values.checkOut)}
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
  );
};

export default BookingForm;
