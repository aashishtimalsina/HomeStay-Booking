import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import webApi from "../../Config/config";
import axios from "axios";

const FormSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  noOfPax: Yup.number().required("Number of passengers is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  hostName: Yup.string().required("HostName is required"),
});
const GuestAsignForm = (props) => {
  const location = useLocation();
  const { id } = location.state || {};
  const apiUrl = webApi.apiUrl;
  const [hostdetail,setHostdetail]=useState([]);
  const [guestdetail,setGuestdetail]=useState([]);

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
        guestNames: values.guestNames,
      };


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
        alert("Booked successfully!");
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
        apiUrl+"/getBookingById"+id,
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
        setGuestdetail(response.data.list);
      
      } else {
        console.error("Empty response data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchHostDetail();
    fetchGuestDetail();
console.log("guest:" +guestdetail)

}, []);
const options = hostdetail.map(host => ({
  value: host.hostName,
  label: host.hostName
}));

// Add more options as needed

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
          }}
          validationSchema={FormSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
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
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    margin="normal"
                    name="name"
                    label="Guest Name"
                    error={errors.name && touched.name}
                    helperText={touched.name && errors.name}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    margin="normal"
                    name="amount"
                    label="Amount"
                    type="number"
                    error={errors.amount && touched.amount}
                    helperText={touched.amount && errors.amount}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    margin="normal"
                    name="noOfPax"
                    label="Number of Pax"
                    type="number"
                    error={errors.noOfPax && touched.noOfPax}
                    helperText={touched.noOfPax && errors.noOfPax}
                  />
                </Grid>
              </Grid>

              <TextField
                fullWidth
                margin="normal"
                name="phoneNumber"
                label="Phone Number"
                type="tel"
                error={errors.phoneNumber && touched.phoneNumber}
                helperText={touched.phoneNumber && errors.phoneNumber}
              />

              <TextField
                fullWidth
                margin="normal"
                name="phone"
                label="Phone"
                type="tel"
                error={errors.phone && touched.phone}
                helperText={touched.phone && errors.phone}
              />

              <TextField
                fullWidth
                margin="normal"
                name="email"
                label="Email"
                type="email"
                error={errors.email && touched.email}
                helperText={touched.email && errors.email}
              />

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
