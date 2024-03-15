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

const EditDetailForm = () => {
  const { id } = useParams();
  const [host, setHost] = useState(null);
  const [formValues, setFormValues] = useState({
    hostName: "",
    about: "",
    email: "",
    image: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    const fetchHost = async () => {
      try {
        const response = await axios.get(
          `https://moved-readily-chimp.ngrok-free.app/hostDetails/${id}`,
          {
            headers: {
              "ngrok-skip-browser-warning": true,
            },
          }
        );
        setHost(response.data.host_details);
      } catch (error) {
        console.error("Error fetching host:", error);
      }
    };

    fetchHost();
  }, [id]);

  useEffect(() => {
    if (host) {
      setFormValues({
        hostName: host.hostName || "",
        about: host.about || "",
        email: host.email || "",
        image: host.image || "",
        address: host.address || "",
        phone: host.phoneNumber || "",
      });
    }
  }, [host]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const imageFile = formValues.image;

      if (imageFile) {
        const imageUrl = await uploadImage(imageFile);
        formValues.image = imageUrl;
      }

      const dataToSend = {
        hostName: formValues.hostName,
        about: formValues.about,
        email: formValues.email,
        address: formValues.address,
        phone: parseInt(formValues.phone),
        image: formValues.image,
      };

      const token = Cookies.get("token");
      if (token) {
        const encodedToken = encodeURIComponent(token);
        const response = await axios.post(
          `https://moved-readily-chimp.ngrok-free.app/updateHost/${id}`,
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
        alert("Host updated successfully.");
      } else {
        console.error("Error:", "Token not found in cookies.");
        alert(
          "An error occurred while updating the host. Please try again later."
        );
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert("Forbidden: You do not have permission to access this resource.");
      } else {
        console.error("Error:", error);
        alert(
          "An error occurred while updating the host. Please try again later."
        );
      }
    }
  };

  if (!host) {
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
              value={formValues.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="hostName"
              name="hostName"
              label="Host Name"
              value={formValues.hostName}
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
            <TextField
              fullWidth
              id="about"
              name="about"
              label="About"
              multiline
              rows={4}
              value={formValues.about}
              onChange={handleChange}
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
                setFormValues({ ...formValues, image: event.target.files[0] });
              }}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="phone"
              name="phone"
              label="Phone"
              value={formValues.phone}
              onChange={handleChange}
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
