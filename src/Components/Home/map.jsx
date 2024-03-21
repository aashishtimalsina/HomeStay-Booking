import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";

const MapSection = () => {
  const [userLatitude, setUserLatitude] = useState(null);
  const [userLongitude, setUserLongitude] = useState(null);

  useEffect(() => {
    const userLat = parseFloat(Cookies.get("latitude"));
    if (!isNaN(userLat)) {
      setUserLatitude(userLat);
    }
    const userLng = parseFloat(Cookies.get("longitude"));
    if (!isNaN(userLng)) {
      setUserLongitude(userLng);
    }
  }, []);

  const distance = parseFloat(Cookies.get("distance"));
  const position = [27.58741, 85.50915];
  const userLocation = [
    userLatitude || position[0],
    userLongitude || position[1],
  ];

  // Define the coordinates for the dotted line
  const latlngs = [position, userLocation];

  return (
    <Card>
      <CardHeader className="text-center" title="Map" />
      <CardContent>
        <MapContainer
          center={position}
          zoom={11}
          scrollWheelZoom={false}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* Draw the dotted line */}
          <Polyline
            pathOptions={{ color: "red", dashArray: "5, 5" }}
            positions={latlngs}
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
          {/* Only display user's marker if user's location is available */}
          {userLatitude && userLongitude && (
            <Marker position={userLocation}>
              <Popup>
                User's Location: <br />
                Latitude: {userLatitude}, Longitude: {userLongitude}
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </CardContent>
      <CardActions>
        <Typography variant="body2" color="text.secondary">
          Distance = {distance} Meter
        </Typography>
      </CardActions>
    </Card>
  );
};

export default MapSection;