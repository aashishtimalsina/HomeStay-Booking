import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
import axios from "axios";

const DetailPage = () => {
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

  //   const Details = [
  //     {
  //       email: "jane.smith@example.com",
  //       hostName: "Jane Smith",
  //       address: "456 Elm Street, Town, Country",
  //       about:
  //         "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //       image: "https://example.com/image2.jpg",
  //       phone: "+0987654321",
  //     },
  //   ];
  return (
    <div className="p-10">
      {Details.map((detail, index) => (
        <div
          key={index}
          style={{
            marginBottom: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "20px",
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4} style={{ textAlign: "center" }}>
              <img
                src={detail.image}
                alt="Profile"
                style={{ maxWidth: "100%", borderRadius: "50%" }}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography variant="h5" gutterBottom>
                {detail.hostName}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Email:</strong> {detail.email}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Address:</strong> {detail.address}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>About:</strong> {detail.about}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Phone:</strong> {detail.phone}
              </Typography>
            </Grid>
          </Grid>
        </div>
      ))}
    </div>
  );
};

export default DetailPage;
