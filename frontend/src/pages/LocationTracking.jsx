import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';  // Import Leaflet for custom markers
import 'leaflet/dist/leaflet.css';  // Import Leaflet's CSS for proper styling

const LocationTracking = () => {
  const [position, setPosition] = useState([51.505, -0.09]);  // Default position (London)
  const [isLocationAvailable, setIsLocationAvailable] = useState(false);  // To check if location is available
  const mapRef = useRef(null);  // Ref for the map instance

  useEffect(() => {
    // Get the user's current position using Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition([latitude, longitude]);  // Update position with user's location
          setIsLocationAvailable(true);  // Set location available to true

          // Update the map center using setView method
          if (mapRef.current) {
            mapRef.current.setView([latitude, longitude], 15);  // 15 is the zoom level
          }
        },
        (error) => {
          console.log('Geolocation error:', error);
          setIsLocationAvailable(false);  // Set location availability to false if error occurs
        }
      );
    }
  }, []); // Empty dependency array to run the effect only once

  // Red marker icon
  const redIcon = new L.Icon({
    iconUrl: '/images/redicon.jpg',  // Path to the red marker image in the public folder
    iconSize: [40, 60],  // Adjust the size of the marker
    iconAnchor: [20, 60],  // Anchor point at the bottom-center of the marker
    popupAnchor: [0, -60],  // Position of the popup relative to the marker
  });

  return (
    <div style={{ height: '100vh' }}>
      <MapContainer 
        center={position} 
        zoom={15} 
        style={{ height: '100%', width: '100%' }} 
        ref={mapRef}  // Assign the ref to the MapContainer to access the map instance
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        {isLocationAvailable ? (
          <Marker position={position} icon={redIcon}>
            <Popup>
              You are here! <br />
              Latitude: {position[0]} <br />
              Longitude: {position[1]}
            </Popup>
          </Marker>
        ) : (
          <Marker position={position}>
            <Popup>
              Default location (London). <br />
              Latitude: {position[0]} <br />
              Longitude: {position[1]}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default LocationTracking;
