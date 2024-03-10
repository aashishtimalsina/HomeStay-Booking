import * as React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  about: Yup.string().required("Description is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required"),
  image: Yup.string().required("Image URL is required"),
});

const EditActivity = () => {
  const { id } = useParams(); // Get the activity ID from URL params
  const [activity, setActivity] = React.useState(null);

  React.useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await axios.get(
          `https://moved-readily-chimp.ngrok-free.app/getActivityDetail/${id}`
        );
        setActivity([response.data.activity_details]); // Update the state with activity details
      } catch (error) {
        console.error("Error fetching activity:", error);
      }
    };

    fetchActivity();
  }, [id]);

  const formik = useFormik({
    initialValues: {
      name: "",
      about: "",
      price: "",
      image: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.put(
          `https://moved-readily-chimp.ngrok-free.app/updateActivity/${id}`,
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

  React.useEffect(() => {
    if (activity) {
      // Set form values when detail is fetched
      handleChange({
        target: { name: "name", value: activity.name },
      });
      handleChange({
        target: { name: "about", value: activity.about },
      });
      handleChange({
        target: { name: "price", value: activity.price },
      });
      handleChange({
        target: { name: "image", value: activity.image },
      });
    }
  }, [activity, handleChange]);

  if (!activity) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", marginTop: 10 }}>
      <Typography variant="h6">Edit Activity</Typography>

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
          label="Description"
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
          Update
        </Button>
      </form>
    </Box>
  );
};

export default EditActivity;
