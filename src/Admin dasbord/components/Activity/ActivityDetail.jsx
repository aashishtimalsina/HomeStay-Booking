import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
import axios from "axios";

const ActivityDetail = () => {
  const { id } = useParams();
  console.log("detail id", id);

  const [activityDetails, setActivityDetails] = useState(null); // Renamed state variable

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = `https://moved-readily-chimp.ngrok-free.app/getActivityDetail/${id}`;
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            "ngrok-skip-browser-warning": true,
          },
        });
        console.log("response", response.data.activity_details);
        setActivityDetails([response.data.activity_details]); // Updated to setActivityDetails
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);
  console.log("activityDetails", activityDetails);
  return (
    <div className="p-10">
      {activityDetails &&
        activityDetails.map((detail) => (
          <div
            key={detail.id} // Ensure each item has a unique key
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
                  <strong>Description:</strong> {detail.about}
                </Typography>
                {/* Assuming address and cost are part of activity details */}
                <Typography variant="subtitle1" gutterBottom>
                  <strong>Price:</strong> {detail.price}
                </Typography>
              </Grid>
            </Grid>
          </div>
        ))}
    </div>
  );
};

export default ActivityDetail;
