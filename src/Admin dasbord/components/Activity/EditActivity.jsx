import * as React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { imageDb } from "../Firebase/Config";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import webApi from "../../../Config/config";

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
  about: Yup.string().required("About is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required"),
});

const EditActivity = () => {
  const { id } = useParams();
  const [activity, setActivity] = React.useState(null);
  const apiUrl = webApi.apiUrl;
  React.useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await axios.get(apiUrl+"/getActivityDetail/"+id, {
          headers: {
            "ngrok-skip-browser-warning": true,
          },
        });
        if (response.data && response.data.activity_details) {
          setActivity(response.data.activity_details);
        } else {
          console.error("Empty response data or missing activity_details");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchActivity();
  }, [id]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: activity?.name || "",
      about: activity?.about || "",
      price: activity?.price || "",
      image: null, // Set initial image value to null
    },
    validationSchema,
    onSubmit: async (values) => {
      const token = Cookies.get("token");
      const encodedToken = encodeURIComponent(token);

      try {
        let updatedImage = values.image;
        if (values.image && typeof values.image !== 'string') {
          const imageUrl = await uploadImage(values.image);
          updatedImage = imageUrl;
        }

        const dataToSend = {
          name: values.name,
          about: values.about,
          price: parseFloat(values.price),
          image: updatedImage,
        };

        await axios.put(
          apiUrl+"/updateActivity/"+id,
          dataToSend,
          {
            headers: {
              "ngrok-skip-browser-warning": true,
              Authorization: `Bearer ${encodedToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        alert("Activity Edited Successfully.");
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });

  if (!activity) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", marginTop: 10 }}>
      <Typography variant="h6">Edit Activity</Typography>

      {/* Display existing image */}
   
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
        <input
          fullWidth
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={(event) => {
            formik.setFieldValue("image", event.currentTarget.files[0]);
          }}
          onBlur={formik.handleBlur}
          margin="normal"
        />
        
        <hr />
        <hr />
        {activity.image && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <img src={activity.image} alt="Existing Image" style={{ maxWidth: '50%' }} />
        </Box>
      )}

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