  import React, { useState } from "react";
  import { ErrorMessage, Formik, useFormik } from "formik";
  import * as Yup from "yup";
  import axios from "axios";
  import TextField from "@mui/material/TextField";
  import Button from "@mui/material/Button";
  import Grid from "@mui/material/Grid";
  import { FilledInput, FormControl, IconButton, InputAdornment, InputLabel, Typography } from "@mui/material";
  import Cookies from "js-cookie";
  import { imageDb } from "./components/Firebase/Config";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import webApi from "../Config/config";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const uploadImage = async (imageFile) => {
  return new Promise(async (resolve, reject) => {
    const imageRef = ref(imageDb, `images/${v4()}`);
    try {
      await uploadBytes(imageRef, imageFile);
      const imageUrl = await getDownloadURL(imageRef);
      resolve(imageUrl);
    } catch (error) {
      reject(error);
    }
  });
};

  const HostSignUp = () => {
    const apiUrl = webApi.apiUrl ;

const [showPassword, setShowPassword] = useState(false);
const [password, SetPassword] = useState(null);
const handleClickShowPassword = () => setShowPassword((show) => !show);
const handleMouseDownPassword = (event) => {
  event.preventDefault();
};
    const HostValid = Yup.object().shape({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
        username: Yup.string().required("User name is required"),
        password: Yup.string().required("Password is required"),
        confirm_password: Yup.string().required("Password is required"),
        
    });

    const initialValues = {
      email: "",
      hostName: "",
      address: "",
      about: "",
      image: "",
      phone: "",
    };

      const formik = useFormik({
        initialValues,
        HostValid,
        onSubmit: async (values) => {
          try {
            const imageFile = values.image;
    
            if (imageFile) {
              const imageUrl = await uploadImage(imageFile);
              values.image = imageUrl;
            }
            console.log(values);
            const dataToSend = {
              email: values.email,
              username: values.username,
              password: values.password, 
              roles: "host", 
            };
             
            const token = Cookies.get("token");
            if (token) {
              const encodedToken = encodeURIComponent(token);
              const response = await axios.post(
                apiUrl+"/addNewUser",
           dataToSend,
                {
                  headers: {
                    "ngrok-skip-browser-warning": true,
                    Authorization: `Bearer ${encodedToken}`,
                    "Content-Type": "application/json",
                  },
                }
              );
              console.log("Response:", response.data);
              alert("Host  added successfully.");
              formik.resetForm();
            } else {
              console.error("Error:", "Token not found in cookies.");
              alert(
                "An error occurred while submitting the form. Please try again later."
              );
            }
          } catch (error) {
            if (error.response && error.response.status === 403) {
              alert(
                "Forbidden: You do not have permission to access this resource."
              );
            } else {
              console.error("Error:", error);
              alert(
                "An error occurred while submitting the form. Please try again later."
              );
            }
          }
        },
    });

    return (
      <div className="p-10">
        <Typography variant="h5" sx={{ marginBottom: "20px" }}>
          Host SignUp
        </Typography>
        <Formik
        HostValid
        initialValues={{
          guests: 1,
          date: new Date(),
        }}>
           {({ isSubmitting }) => (

        <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="username"
              name="username"
              label="User Name"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              margin="normal"
            />
            <ErrorMessage
              name="username"
              component="div"
              className="text-red-500 text-xs italic"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              margin="normal"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-xs italic"
            />
          </Grid>
          </Grid>
          <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-xs italic"
            />
            </Grid>
          <Grid item xs={12} sm={6}>
          {/* <label
            htmlFor="confirm_password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            id="confirm_password"
            type="confirm_password"
            placeholder="confirm_password"
            name="Confirm Password"
            value={formik.values.confirm_password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
         <ErrorMessage
              name="confirm_password"
              component="div"
              className="text-red-500 text-xs italic"
            /> */}
            </Grid>
              </Grid>
              <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 3 }}
        >
          Submit
        </Button>
        </form>
        )}
      </Formik>
      </div>
    );
  };

  export default HostSignUp;
