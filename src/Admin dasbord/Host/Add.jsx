import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

const AddDetailForm = () => {
  const [token, setToken] = useState(null); // State to store the token
  const tokenUrl =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdW5pdGEiLCJpYXQiOjE3MDk2NjQ0MTIsImV4cCI6MTcwOTY2NjIxMn0.9ArS6K-I3rtzpau_b_hG2Kvs_NfImsS_CHnijTgqw7g"; // URL to fetch token

  // Function to fetch token
  const fetchToken = async () => {
    try {
      const response = await axios.post(tokenUrl, {
        /* Include any data needed to fetch the token */
      });
      setToken(response.data.token); // Assuming the token is returned in the response
    } catch (error) {
      console.error("Error fetching token:", error);
    }
  };

  // Call fetchToken when component mounts to get the token
  useEffect(() => {
    fetchToken();
  }, []);
  // Validation schema using Yup
  const Loginschema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    hostName: Yup.string().required("Host name is required"),
    address: Yup.string().required("Address is required"),
    about: Yup.string().required("About is required"),
    image: Yup.string().required("Image URL is required"),
    phone: Yup.string().required("Phone number is required"),
    // Add more validation rules for other fields if needed
  });

  // Initial form values
  const initialValues = {
    email: "",
    hostName: "",
    address: "",
    about: "",
    image: "",
    phone: "",
    // Add more fields here
  };

  const apiUrl =
    "https://30ee-2400-1a00-b060-9f96-d021-5e8-2d6-bd63.ngrok-free.app/saveHost?fbclid=IwAR3GKRHph62UTQwgQSDnnq-V37XiU1EP6PU-5Muy51DY4t1baqWbn2c70Ys";

  // Formik hook
  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: Loginschema,
    onSubmit: async (values, action) => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.post(apiUrl, values, config);
        console.log("Response:", response.data);
        console.log("role:", response.data.role);

        if (response.data.role === "admin") {
          // Redirect to admin page
          navigate("/admin");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });

  return (
    <div className="p-10">
      <Typography variant="h5" sx={{ marginBottom: "20px" }}>
        Add Details
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={values.email}
              onChange={handleChange}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="hostName"
              name="hostName"
              label="Host Name"
              value={values.hostName}
              onChange={handleChange}
              error={touched.hostName && Boolean(errors.hostName)}
              helperText={touched.hostName && errors.hostName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="address"
              name="address"
              label="Address"
              value={values.address}
              onChange={handleChange}
              error={touched.address && Boolean(errors.address)}
              helperText={touched.address && errors.address}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="about"
              name="about"
              label="About"
              multiline
              rows={4}
              value={values.about}
              onChange={handleChange}
              error={touched.about && Boolean(errors.about)}
              helperText={touched.about && errors.about}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="image"
              name="image"
              label="Image URL"
              value={values.image}
              onChange={handleChange}
              error={touched.image && Boolean(errors.image)}
              helperText={touched.image && errors.image}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="phone"
              name="phone"
              label="Phone"
              value={values.phone}
              onChange={handleChange}
              error={touched.phone && Boolean(errors.phone)}
              helperText={touched.phone && errors.phone}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: "20px" }}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddDetailForm;
