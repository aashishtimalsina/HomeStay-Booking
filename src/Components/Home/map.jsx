import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

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

    const position = [27.58741, 85.50915];
    const userLocation = [userLatitude || position[0], userLongitude || position[1]];

    return (
        <>
            <MapContainer
                center={position}
                zoom={11}
                scrollWheelZoom={false}
                style={{ height: "400px", width: "50%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
        </>
    );
};

export default MapSection;
