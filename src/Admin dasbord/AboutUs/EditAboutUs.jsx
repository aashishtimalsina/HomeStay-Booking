import React, { useEffect, useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { useParams } from "react-router";
import Cookies from "js-cookie";
import { imageDb } from "../components/Firebase/Config";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const uploadImage = async (imageFile) => {
  return new Promise(async (resolve, reject) => {
    const storage = getStorage();
    const imageRef = ref(storage, `images/${uuidv4()}`);
    try {
      await uploadBytes(imageRef, imageFile);
      const imageUrl = await getDownloadURL(imageRef);
      resolve(imageUrl);
    } catch (error) {
      reject(error);
    }
  });
};

const EditAboutUs = () => {
  const { id } = useParams();
  const [homestayDetails, setHomestayDetails] = useState(null);
  const [formValues, setFormValues] = useState({
    title: "",
    price: "",
    address: "",
    homeImage: "",
    galleryImages: [],
  });

  useEffect(() => {
    const fetchHomestayDetails = async () => {
      try {
        const response = await axios.get(
          `https://moved-readily-chimp.ngrok-free.app/getHomeStayInfo/${id}`,
          {
            headers: {
              "ngrok-skip-browser-warning": true,
            },
          }
        );
        setHomestayDetails(response.data.homestay_details);
      } catch (error) {
        console.error("Error fetching homestay details:", error);
      }
    };

    fetchHomestayDetails();
  }, [id]);

  useEffect(() => {
    if (homestayDetails) {
      setFormValues({
        title: homestayDetails.title || "",
        price: homestayDetails.price || "",
        address: homestayDetails.address || "",
        homeImage: homestayDetails.homeImage || "",
        galleryImages: homestayDetails.galleryImages || [],
      });
    }
  }, [homestayDetails]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedGalleryImages = [...formValues.galleryImages];
      const homeImageFile = event.target.homeImage.files[0];
      const galleryImageFiles = event.target.galleryImages.files;

      if (homeImageFile) {
        const homeImageUrl = await uploadImage(homeImageFile);
        formValues.homeImage = homeImageUrl;
      }

      for (const galleryImageFile of galleryImageFiles) {
        const galleryImageUrl = await uploadImage(galleryImageFile);
        updatedGalleryImages.push(galleryImageUrl);
      }

      const dataToSend = {
        title: formValues.title,
        price: parseFloat(formValues.price),
        address: formValues.address,
        homeImage: formValues.homeImage,
        galleryImages: updatedGalleryImages,
      };

      const token = Cookies.get("token");
      if (token) {
        const encodedToken = encodeURIComponent(token);
        const response = await axios.put(
          `https://moved-readily-chimp.ngrok-free.app/updateHomeStayInfo/${id}`,
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
        alert("Homestay details updated successfully.");
      } else {
        console.error("Error:", "Token not found in cookies.");
        alert(
          "An error occurred while updating the homestay details. Please try again later."
        );
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert("Forbidden: You do not have permission to access this resource.");
      } else {
        console.error("Error:", error);
        alert(
          "An error occurred while updating the homestay details. Please try again later."
        );
      }
    }
  };

  if (!homestayDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-10">
      <Typography variant="h5" sx={{ marginBottom: "20px" }}>
        Edit Homestay Details
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="title"
              name="title"
              label="Title"
              value={formValues.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="price"
              name="price"
              label="Price"
              type="number"
              value={formValues.price}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="address"
              name="address"
              label="Address"
              value={formValues.address}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <input
              fullWidth
              id="homeImage"
              name="homeImage"
              label="Home Image"
              type="file"
              accept="image/*"
              onChange={(event) => {
                setFormValues({ ...formValues, homeImage: event.target.files[0] });
              }}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <input
              fullWidth
              id="galleryImages"
              name="galleryImages"
              label="Gallery Images"
              type="file"
              accept="image/*"
              multiple
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <ul>
              {formValues.galleryImages.map((image, index) => (
                <li key={index}>{image}</li>
              ))}
            </ul>
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

export default EditAboutUs;