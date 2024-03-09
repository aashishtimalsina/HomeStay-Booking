import * as React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { Typography } from "@mui/material";

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
        const response = await axios.post(
          "https://your-api-endpoint.com/activities", // Replace with your API endpoint
          values
        );
        console.log("Response:", response.data);
        // Handle success response
      } catch (error) {
        console.error("Error:", error);
        // Handle error response
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
        <TextField
          fullWidth
          id="image"
          name="image"
          label="Image URL"
          value={formik.values.image}
          onChange={formik.handleChange}
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
