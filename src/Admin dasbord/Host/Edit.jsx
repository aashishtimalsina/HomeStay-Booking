import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { useParams } from "react-router";

const EditDetailForm = () => {
  const { id } = useParams();
  console.log("detail id", id);
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await axios.get(
          `https://moved-readily-chimp.ngrok-free.app/hostDetails/${id}`,
          {
            headers: {
              "ngrok-skip-browser-warning": true,
            },
          }
        );
        if (response.data) {
          setHosts(response.data.list || []);
          setDetail(response.data.list || []);
          console.log("Response data:", response.data);
        } else {
          console.error("Empty response data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDetail();
  }, [id]);

  const EditSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    hostName: Yup.string().required("Host name is required"),
    address: Yup.string().required("Address is required"),
    about: Yup.string().required("About is required"),
    image: Yup.string().required("Image URL is required"),
    phone: Yup.string().required("Phone number is required"),
  });

  const apiUrl = " https://moved-readily-chimp.ngrok-free.app/getHostDetails}";

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      hostName: "",
      address: "",
      about: "",
      image: "",
      phone: "",
    },
    validationSchema: EditSchema,
    onSubmit: async (values, action) => {
      try {
        const response = await axios.put(`${apiUrl}/${id}`, values);
        console.log("Response:", response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });

  useEffect(() => {
    if (detail) {
      const { email, hostName, address, about, image, phone } = detail;
      // Set form values when detail is fetched
      values.email = email;
      values.hostName = hostName;
      values.address = address;
      values.about = about;
      values.image = image;
      values.phone = phone;
    }
  }, [detail, values]);

  if (!detail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-10">
      <Typography variant="h5" sx={{ marginBottom: "20px" }}>
        Edit Detail
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
          Update
        </Button>
      </form>
    </div>
  );
};

export default EditDetailForm;
