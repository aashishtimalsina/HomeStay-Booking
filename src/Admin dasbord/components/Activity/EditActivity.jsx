import * as React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { v4 } from "uuid";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Cookies from "js-cookie";

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
  about: Yup.string().required("Description is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required"),
  image: Yup.string().required("Image URL is required"),
});

const EditActivity = () => {
  const { id } = useParams();
  const [activity, setActivity] = React.useState({});

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
        const imageFile = values.image;

        if (imageFile) {
          const imageUrl = await uploadImage(imageFile);
          values.image = imageUrl;
        }

        const dataToSend = {
          name: values.name,
          about: values.about,
          price: parseFloat(values.price),
          image: [values.image],
        };

        const token = Cookies.get("token");
        if (token) {
          const encodedToken = encodeURIComponent(token);
          const response = await axios.post(
            `https://moved-readily-chimp.ngrok-free.app/updateActivity/${id}`,
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
          alert("Activity updated successfully.");
          formik.resetForm(); // Reset the form after successful submission
        } else {
          console.error("Error:", "Token not found in cookies.");
          alert(
            "An error occurred while updating the activity. Please try again later."
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
            "An error occurred while updating the activity. Please try again later."
          );
        }
      }
    },
  });

  const handleChange = React.useCallback(
    (event) => {
      const { name, value } = event.target;
      formik.setFieldValue(name, value);
    },
    [formik]
  );

  React.useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await axios.get(
          `https://moved-readily-chimp.ngrok-free.app/getActivityDetail/${id}`
        );
        setActivity(response.data.activity_details);
      } catch (error) {
        console.error("Error fetching activity:", error);
      }
    };

    fetchActivity();
  }, [id]);

  // Populate form fields with fetched activity data
  React.useEffect(() => {
    formik.setValues({
      name: activity.name || "",
      about: activity.about || "",
      price: activity.price || "",
      image: activity.image || "",
    });
  }, [activity, formik]);

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
