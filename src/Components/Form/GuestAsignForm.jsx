import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, FormControl, Grid, Input, InputAdornment, InputLabel, MenuItem, Select, TextField } from "@mui/material";
 
import Cookies from "js-cookie";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import webApi from "../../Config/config";
import axios from "axios";
import dayjs from "dayjs";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { debounce } from 'lodash'; 

const FormSchema = Yup.object().shape({
  
  // name: Yup.string().required("Name is required"),
  // email: Yup.string().email("Invalid email").required("Email is required"),
  // noOfPax: Yup.number().required("Number of passengers is required"),
  // phoneNumber: Yup.string().required("Phone number is required"),
  // hostName: Yup.string().required("HostName is required"),
});
const GuestAsignForm = (props) => {
  const today = new Date();
  const defaultDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
  // const id =props.match.params.id
  const location = useLocation();
   const apiUrl = webApi.apiUrl;
    const { id } = useParams();
  
  const [hostdetail,setHostdetail]=useState([]);
  const [unAssaignedGuest,setUnAssaignedGuest]=useState([]);
  const [noOfGuest,SetNoOfGuest]=useState(null);

  const [guestPerPrice,SetguestPerPrice]=useState(null);
  const [checkInDate,SetCheckInDate]=useState(null);
   const [checkOutDate,SetCheckOutDate]=useState(null);
   const [totalPrice,SetTotalPrice] =useState(0);
  const [hostingPrice,SetHostingPrice] =useState(0);

  const [totalStayDuration,SetTotalStayDuration]=useState(0);
  
  const navigate =useNavigate();
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        navigate('/login');
      }

      const encodedToken = encodeURIComponent(token);
       // Prepare the data to send including the payment method
      const dataToSend = {
     
      noOfGuest: values.noOfGuest ||noOfGuest,
         guestNames: personName, 
         hostName:values.hostName,
        country: values.country,
        email: values.email,
        checkIn: values.checkIn,
        checkOut: values.checkOut,
        noOfRooms: parseInt(values.noOfRooms),
        paymentMethod: values.paymentMethod,
       };
        console.log(dataToSend);  

      const response = await axios.post(
        apiUrl+ "/bookHomestay",
        dataToSend,
        {
          headers: {
            "ngrok-skip-browser-warning": true,
            Authorization: `Bearer ${encodedToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        alert("Assaigned successfully!");
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
  const calculateTotalStayDuration = () => {
      
    const dt1 = new Date(checkInDate);
   const dt2 = new Date(checkOutDate);
   const diff= Math.floor(
     (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
       Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
       (1000 * 60 * 60 * 24)
   );
 
 SetTotalStayDuration(diff);
 console.log("ok:"+checkInDate,checkOutDate);
};
  const fetchHostDetail = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        navigate('/login');
      }

      const encodedToken = encodeURIComponent(token);
      const response = await axios.get(
        apiUrl+"/getHostDetails",
        {
          headers: {
            "ngrok-skip-browser-warning": true,
            Authorization: `Bearer ${encodedToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
       if (response.data) {
          setHostdetail(response.data.list);
      
      } else {
        console.error("Empty response data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchGuestDetail = async () => {
    
    try {
      const token = Cookies.get("token");
      if (!token) {
        navigate('/login');
      }

      const encodedToken = encodeURIComponent(token);
      const response = await axios.get(
        apiUrl+"/getBookingById/"+id,
        {
          headers: {
            "ngrok-skip-browser-warning": true,
            Authorization: `Bearer ${encodedToken}`,
            "Content-Type": "application/json",
          },
        }
      );
        if (response.data) {
           SetNoOfGuest(response.data.booking_details.noOfGuest);      
          setUnAssaignedGuest(response.data.booking_details.guestNames);       
          SetCheckInDate(response.data.booking_details.checkIn);    
          SetCheckOutDate(response.data.booking_details.checkOut);   
 
      } else {
        console.error("Empty response data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchHometayInfo = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        navigate('/login');
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
          SetguestPerPrice(response.data.homestay_details.price);      
          calculateTotalPrice();
          calculateHostingPrice();
      } else {
        console.error("Empty response data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
 
  
  const calculateTotalPrice =()=>{
    
       const totalPrices=guestPerPrice*totalStayDuration*noOfGuest;
      SetTotalPrice(totalPrices);
   }
  const calculateHostingPrice =()=>{
       const hostprice=totalPrice*80/100;
      SetHostingPrice(hostprice);
   }
  useEffect(() => {
    fetchHostDetail();
    fetchGuestDetail();
    fetchHometayInfo();
    
  
 }, []);

 



const options = useMemo(
  () =>
    hostdetail.map((host) => ({
      value: host.hostName,
      label: host.hostName,
    })),
  [hostdetail]
);

const [personName, setPersonName] = React.useState([]);
 const handleChange = (event) => {
  setPersonName(event.target.value);
};
const changeCheckInDate=(selectedDate)=>{
  
     SetCheckInDate(selectedDate);
}
const changeCheckoutDate=(selectedDate)=>{
  
     SetCheckOutDate(selectedDate);
}
  return (
    <div className="my-10 w-full flex justify-center items-center m-auto">
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
            noOfGuest: noOfGuest ? noOfGuest : "", 
          }}
          validationSchema={FormSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
             

              <Grid container spacing={2}>
              <Grid item xs={12} sm={5}>
                  <TextField
                    fullWidth
                    margin="normal"
                    name="noOfGuest"
                    value={noOfGuest || ''}
                    label="No Of Guests"
                    error={errors.noOfGuest && touched.noOfGuest}
                    helperText={touched.noOfGuest && errors.noOfGuest}
                    InputLabelProps={{
                      shrink: !!noOfGuest,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={7}>
                <FormControl
                fullWidth
                
                error={errors.hostName && touched.hostName}
              >
                <InputLabel id="demo-mutiple-name-label">Guest Name</InputLabel>

                   <Select
                          labelId="demo-mutiple-name-label"
                          id="demo-mutiple-name"
                          multiple
                          name="guestNames"
                          value={personName}
                          onChange={handleChange}
                          input={<Input />}
                          // MenuProps={MenuProps}
                          sx={{
                            width: '100%', // Set the width to 100% for full width
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: 'transparent', // Remove the border
                              },
                              '&:hover fieldset': {
                                borderColor: 'transparent', // Remove the hover border
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: 'transparent', // Remove the focused border
                              },
                            },
                          }}
                        >
                          {unAssaignedGuest.map((name) => (
                            <MenuItem key={name} value={name}>
                              {name}
                            </MenuItem>
                          ))}
                    </Select>
             </FormControl>
                </Grid>
                </Grid>
                <FormControl
                fullWidth
                margin="normal"
                error={errors.hostName && touched.hostName}
              >
                <InputLabel id="hostName-label">HostName</InputLabel>
                <Field
                  name="hostName"
                  as={Select}
                  labelId="hostName-label"
                  label="HostName"
                >
                  {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Field>
                <ErrorMessage
                  name="hostName"
                  component="div"
                  className="text-red-500"
                />
              </FormControl>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                <p className="text-gray-500">Check In Date</p>

                  {/* <TextField
                    fullWidth
                    margin="normal"
                    name="assignmentDate"
                    label="Check In Date"
                    type="text"
                    disabled
                    value={checkInDate || ""}
                    error={errors.amount && touched.amount}
                    helperText={touched.amount && errors.amount}
                  /> */}
                    <Field
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                id="checkOut"
                name="checkOut"
                value={checkInDate ||""}
                onChange={changeCheckInDate}
                type="date"
              />
              <ErrorMessage
                name="checkOut"
                component="div"
                className="text-red-500 text-xs italic"
              />
                {/* <LocalizationProvider  dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>

                      <DatePicker label="Check In Date"
                      onChange={changeCheckInDate()}
                        //  value={formattedCheckInDate} 
                       />
                    </DemoContainer>
                 </LocalizationProvider> */}
                </Grid>
                <Grid item xs={12} sm={6}>
              <p className="text-gray-500">Check Out Date</p>
                      <Field
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                id="checkOut"
                name="checkOut"
                value={checkOutDate ||""}
                onChange={changeCheckoutDate}
                type="date"
              />
              <ErrorMessage
                name="checkOut"
                component="div"
                className="text-red-500 text-xs italic"
              />
               
                </Grid>
              </Grid>
               
             
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    margin="normal"
                    name="totalStayDuration"
                    label="Total Stay Duration "
                    type="number"
                    value={totalStayDuration || 0}
                    InputLabelProps={{
                      shrink: !!totalStayDuration,
                    }}
                    error={errors.amount && touched.amount}
                    helperText={touched.amount && errors.amount}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    margin="normal"
                    name="totalPrice "
                    label="Total Price "
                    type="number"
                    value={totalPrice}
                    InputLabelProps={{
                      shrink: !!totalPrice,
                    }}
                    error={errors.totalPrice && touched.totalPrice}
                    helperText={touched.totalPrice && errors.totalPrice}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    margin="normal"
                    name="hostIncome "
                    label="Host Income "
                    disabled
                    value={hostingPrice}
                    type="number"
                    InputLabelProps={{
                      shrink: !!hostingPrice,
                    }}
                    error={errors.hostIncome && touched.hostIncome}
                    helperText={touched.hostIncome && errors.hostIncome}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    margin="normal"
                    name="hostIncome "
                    label="Host Income "
                    disabled
                    value={hostingPrice||0}
                    type="number"
                    InputLabelProps={{
                      shrink: !!hostingPrice,
                    }}
                    error={errors.hostIncome && touched.hostIncome}
                    helperText={touched.hostIncome && errors.hostIncome}
                  />
                </Grid>
              </Grid>
             

            

              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="mt-4"
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default GuestAsignForm;
