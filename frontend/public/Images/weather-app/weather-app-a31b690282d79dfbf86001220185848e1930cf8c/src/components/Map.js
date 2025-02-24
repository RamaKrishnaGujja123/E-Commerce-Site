import React, { useEffect, useRef } from "react";
import L from "leaflet";
import '../styles/App.css';

const Map = ({ lat, lon }) => {
  const mapRef = useRef(null); // Use a reference to store the map instance

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([lat, lon], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current);

      const marker = L.marker([lat, lon]).addTo(mapRef.current);
      marker.bindPopup("<b>Your Location</b>").openPopup();
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [lat, lon]);

  return <div id="map" className="map-container"></div>;
};

export default Map;
