import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
import axios from "axios";

const ActivityDetail = () => {
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
          setDetail(response.data.list?.[0] || null); // Assuming the response is an array with only one item
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

  if (!detail) {
    return <div>Loading...</div>;
  }
  //   const Details = [
  //     {
  //       name: "sfiuhwfoi",
  //       description: "jdsfkajs",
  //       cost: "sfhaisjf",
  //       image: "sfjasof",
  //     },
  //   ];
  return (
    <div className="p-10">
      {/* {Details.map((detail) => ( */}
      <div
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
              {detail.name}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Description:</strong> {detail.description}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Address:</strong> {detail.address}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Cost:</strong> {detail.cost}
            </Typography>
          </Grid>
        </Grid>
      </div>
      {/* ))} */}
    </div>
  );
};

export default ActivityDetail;
