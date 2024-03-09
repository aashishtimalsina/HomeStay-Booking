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
  description: Yup.string().required("Description is required"),
  cost: Yup.number()
    .typeError("Cost must be a number")
    .required("Cost is required"),
  image: Yup.string().required("Image URL is required"),
});

const EditActivity = () => {
  const { id } = useParams(); // Get the activity ID from URL params
  const [activity, setActivity] = React.useState(null);

  React.useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await axios.get(
          `https://your-api-endpoint.com/activities/${id}`
        );
        setActivity(response.data);
      } catch (error) {
        console.error("Error fetching activity:", error);
      }
    };

    fetchActivity();
  }, [id]);

  const formik = useFormik({
    initialValues: {
      name: activity?.name || "",
      description: activity?.description || "",
      cost: activity?.cost || "",
      image: activity?.image || "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.put(
          `https://your-api-endpoint.com/activities/${id}`,
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
          id="description"
          name="description"
          label="Description"
          multiline
          rows={4}
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
          margin="normal"
        />
        <TextField
          fullWidth
          id="cost"
          name="cost"
          label="Cost"
          type="number"
          value={formik.values.cost}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.cost && Boolean(formik.errors.cost)}
          helperText={formik.touched.cost && formik.errors.cost}
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
