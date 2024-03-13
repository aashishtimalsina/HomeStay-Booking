import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

import { imageDb } from "../components/Firebase/Config";
import Cookies from "js-cookie";

const AddDetailForm = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    hostName: Yup.string().required("Host name is required"),
    address: Yup.string().required("Address is required"),
    about: Yup.string().required("About is required"),
    image: Yup.string().required("Image URL is required"),
    phone: Yup.string().required("Phone number is required"),
  });

  const initialValues = {
    email: "",
    hostName: "",
    address: "",
    about: "",
    image: [],
    phone: "",
  };

  const apiUrl = "https://moved-readily-chimp.ngrok-free.app/saveHost";

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const imageFile = values.image;

        if (imageFile) {
          const imageUrl = await uploadImage(imageFile);
          values.image = imageUrl;
        }
        const dataToSend = {
          email: values.email,
          hostName: values.hostName,
          address: values.address,
          about: values.about,
          image: values.image,
          phone: values.phone,
        };
        const token = Cookies.get("token");
        if (token) {
          const encodedToken = encodeURIComponent(token);
          const response = await axios.post(
            "https://moved-readily-chimp.ngrok-free.app/saveHost",
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
          alert("Activity added successfully.");
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

  return (
    <div className="p-10">
      <Typography variant="h5" sx={{ marginBottom: "20px" }}>
        Add Details
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="hostName"
              name="hostName"
              label="Host Name"
              value={formik.values.hostName}
              onChange={formik.handleChange}
              error={formik.touched.hostName && Boolean(formik.errors.hostName)}
              helperText={formik.touched.hostName && formik.errors.hostName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="address"
              name="address"
              label="Address"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
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
              value={formik.values.about}
              onChange={formik.handleChange}
              error={formik.touched.about && Boolean(formik.errors.about)}
              helperText={formik.touched.about && formik.errors.about}
            />
          </Grid>
          <Grid item xs={12}>
            <input
              fullWidth
              id="image"
              name="image"
              label="Image"
              type="file"
              accept="image/*"
              onChange={(event) => {
                formik.setFieldValue("image", event.currentTarget.files[0]);
              }}
              onBlur={formik.handleBlur}
              error={formik.touched.image && Boolean(formik.errors.image)}
              helperText={formik.touched.image && formik.errors.image}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="phone"
              name="phone"
              label="Phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
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
