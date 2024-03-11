import * as React from "react";
import Cookies from "js-cookie";
import { useFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { Typography } from "@mui/material";
import { imageDb } from "../Firebase/Config";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

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


const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  cost: Yup.number()
    .typeError("Cost must be a number")
    .required("Cost is required"),
  image: Yup.string().required("Image URL is required"),
});


const initialValues = {
  name: "",
  about: "",
  price: "",
  image: "",
};


const ActivityForm = () => {
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
          name: values.name,
          about: values.description,
          price: parseFloat(values.cost),
          image: [values.image],

        };
        const token = Cookies.get("token");
        if (token) {
          const encodedToken = encodeURIComponent(token);
          const response = await axios.post(
            "https://moved-readily-chimp.ngrok-free.app/addNewActivity",
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
          alert("An error occurred while submitting the form. Please try again later.");
        }

      } catch (error) {
        if (error.response && error.response.status === 403) {
          alert("Forbidden: You do not have permission to access this resource.");
        } else {
          console.error("Error:", error);
          alert("An error occurred while submitting the form. Please try again later.");
        }
      }
    },
  });
  return (
    <Box sx={{ maxWidth: 400, margin: "auto", marginTop: 10 }}>
      <Typography variant="h6">Add Activity</Typography>

      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Name"
          autoComplete="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          margin="normal"
        />
        <TextField
          fullWidth
          id="about"
          name="about"
          label="About"
          multiline
          rows={4}
          value={formik.values.about}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.about && Boolean(formik.errors.about)}
          helperText={formik.touched.about && formik.errors.about}
          margin="normal"
        />
        <TextField
          fullWidth
          id="price"
          name="price"
          label="Price"
          type="number"
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.price && Boolean(formik.errors.price)}
          helperText={formik.touched.price && formik.errors.price}
          margin="normal"
        />
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
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 3 }}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default ActivityForm;
