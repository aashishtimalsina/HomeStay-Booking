import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, FormControl, Grid, Input, InputAdornment, InputLabel, MenuItem, Select, TextField } from "@mui/material";
 
import Cookies from "js-cookie";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import webApi from "../../Config/config";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content'

const FormSchema = Yup.object().shape({
  
   hostName: Yup.string().required("Host is Required "),
  // email: Yup.string().email("Invalid email").required("Email is required"),
  // noOfPax: Yup.number().required("Number of passengers is required"),
  // phoneNumber: Yup.string().required("Phone number is required"),
  // hostName: Yup.string().required("HostName is required"),
});

const GuestAsignForm = (props) => {
   const MySwal = withReactContent(Swal)
   const today = new Date();
  const defaultDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
  // const id =props.match.params.id
  const location = useLocation();
   const apiUrl = webApi.apiUrl;
    const { id } = useParams();
  
  const [hostdetail,setHostdetail]=useState([]);
  const [unAssaignedGuest,setUnAssaignedGuest]=useState([]);
  const [unAssaignedGuestWise, setUnAssaignedGuestWise] = useState(['No Data Found']);
    const [noOfGuest,SetNoOfGuest]=useState(0);
  const [guestPerPrice,SetguestPerPrice]=useState(0);
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
        booking_id:id,
        guestName: personName, 
        hostName:values.hostName,
        assignmentDate: checkInDate,
         numOfGuests: noOfGuest,
         totalStayDuration: totalStayDuration,
         totalPrice: totalPrice,
         hostIncome: hostingPrice,
       };
       console.log(dataToSend);
 
      const response = await axios.post(
        apiUrl+ "/assign",
        dataToSend,
        {
          headers: {
            "ngrok-skip-browser-warning": true,
            Authorization: `Bearer ${encodedToken}`,
            "Content-Type": "application/json",
          },
        }
      );
       if (response.data.status == 200 ) {
        return MySwal.fire({
          icon: 'success',
          title: 'Booking  Successful',
         });
      } else {
        return MySwal.fire({
          icon: 'error',
          title: 'Booking  Successful',
         });
      }
    } catch (error) {
      console.log(error)
      if(error.response.status == 400){
        return MySwal.fire({
          icon: 'error',
          title: error.response.data.status,
         });
      }else{
      return MySwal.fire({
        icon: 'error',
        title: 'Please check the Guest Field Or Try Again ! Something went wrong ',
       });
      }
    }

    // Set submitting to false
    setSubmitting(false);
  };
  function calculateTotalStayDuration  (checkInDate,checkOutDate)  {
     const dt1 = new Date(checkInDate);
   const dt2 = new Date(checkOutDate);
   const diff= Math.floor(
     (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
       Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
       (1000 * 60 * 60 * 24)
   );
 
 SetTotalStayDuration(diff);

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
          //  SetNoOfGuest(response.data.booking_details.noOfGuest);      
          setUnAssaignedGuest(response.data.booking_details.guestNames);       
          setUnAssaignedGuestWise(response.data.booking_details.guestNames);       
          SetCheckInDate(response.data.booking_details.checkIn);    
          SetCheckOutDate(response.data.booking_details.checkOut);   
          calculateTotalStayDuration(response.data.booking_details.checkIn,response.data.booking_details.checkOut);
 
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
          calculateTotalPrice(response.data.homestay_details.price,totalStayDuration,noOfGuest);
          
      } else {
        console.error("Empty response data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
 
  function handleDataAssaignedWise(UnAssaignedGuest,assaignedGuest) {
    const dublicateExtracted=[];
    const mergedArray = [...new Set([...UnAssaignedGuest, ...assaignedGuest])];
    const uniqueArray = mergedArray.filter((item, index) => {
      if (UnAssaignedGuest.indexOf(item) != assaignedGuest.indexOf(item)) {
        dublicateExtracted.push(item);
        
    }

  });
     if(dublicateExtracted.length === 0){
     
      setUnAssaignedGuestWise(['No Data Found'])
    }else{
        setUnAssaignedGuestWise(dublicateExtracted)
      }
  }
    function calculateTotalPrice(GuestPerPrice,TotalStayduration,NoOfGuest){
        const TotalPrices=parseFloat(GuestPerPrice*TotalStayduration*NoOfGuest);
        
       SetTotalPrice(TotalPrices.toFixed(2));
   }
  function calculateHostingPrice (TotalPrice){
        SetHostingPrice((TotalPrice*80/100).toFixed(2));
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
  handleDataAssaignedWise(unAssaignedGuest,event.target.value)
  SetNoOfGuest(event.target.value.length);
};
const changeCheckInDate=(event)=>{

     SetCheckInDate(event.target.value);
      if(checkOutDate){
      calculateTotalStayDuration(event.target.value,checkOutDate);
    }
}
const changeCheckoutDate=(event)=>{
 
     SetCheckOutDate(event.target.value);
      if(checkInDate ){
        calculateTotalStayDuration(checkInDate,event.target.value);
     }
}

  return (
    <div className="my-10 w-full flex justify-center items-center m-auto">
      <div>
      <h2 class="heading-2xl font-bold mb-4">Guest Information <span class="small-text">(Per Guest: {guestPerPrice})</span></h2>        <Formik
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
          {({ errors, touched ,values}) => (
            <Form>
             

              <Grid container spacing={2}>
              
                <Grid item xs={12} sm={7}>
                <FormControl
                fullWidth
                
                error={errors.guestName && touched.guestName}
              >
                <InputLabel id="demo-mutiple-name-label">Guest Name</InputLabel>

                   <Select
                          labelId="demo-mutiple-name-label"
                          id="demo-mutiple-name"
                          multiple
                          name="guestName"
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
                <Grid item xs={12} sm={5}>
                  <TextField
                    fullWidth
                    margin="normal"
                    name="noOfGuest"
                    value={noOfGuest || 0}
                    label="No Of Guests"
                    // error={errors.noOfGuest && touched.noOfGuest}
                    // helperText={touched.noOfGuest && errors.noOfGuest}
                    InputLabelProps={{
                      shrink: noOfGuest!=null,
                    }}
                    
                  />
                  <ErrorMessage
                  name="noOfGuest"
                  component="div"
                  className="text-red-500"
                />
                </Grid>
                </Grid>
                <Grid container spacing={2}>
              
              <Grid item xs={12} sm={7}>
              <FormControl
              fullWidth
              
           
            >
              <InputLabel id="demo-mutiple-name-label">Un-Assaigned Guest Name</InputLabel>

                 <Select
                        labelId="demo-mutiple-name-label"
                        id="demo-mutiple-name"
                        multiple
                        name="unAsaignedGuest"
                        value={unAssaignedGuestWise}
                        onChange={handleDataAssaignedWise}
                        input={<Input />}
                        disabled
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
                          <MenuItem key="No Data Found" value="No Data Found">
                            No Data Found
                          </MenuItem>
                  </Select>
           </FormControl>
              </Grid>
              <Grid item xs={12} sm={5}>
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
              </Grid>
              </Grid>
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
                disabled
              />
              <ErrorMessage
                name="checkOut"
                component="div"
                className="text-red-500 text-xs italic"
              />
            
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
                disabled
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
                    value={totalStayDuration}
                    onChange={calculateTotalPrice(guestPerPrice,totalStayDuration,noOfGuest)}
                    InputLabelProps={{
                      shrink: totalStayDuration !=null,
                    }}
                    disabled
                    error={errors.totalStayDuration && touched.totalStayDuration}
                    helperText={touched.totalStayDuration && errors.totalStayDuration}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    margin="normal"
                    name="totalPrice "
                    label="Total Price "
                    value={totalPrice}
                    onchange={calculateHostingPrice (totalPrice)}
                    type="number"
                    InputLabelProps={{
                      shrink: totalPrice!=null,
                    }}
                    disabled
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
                    value={hostingPrice}
                     type="number"
                    InputLabelProps={{
                      shrink: hostingPrice!=null,
                    }}
                    disabled
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
