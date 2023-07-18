import React, { useEffect } from "react";
import styled from "styled-components";
import Map, { NavigationControl, Marker } from "react-map-gl/maplibre";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const Titles = styled.p`
  font-weight: bold;
  font-size: 1.4rem;
  margin-left: 1rem;
`;

export default function MapContent() {
  const [location, setLocation] = React.useState<GeolocationPosition>();
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((location) => {
        setLocation(location);
        console.log(location);
      });
    }
  }, []);
  return (
    <>
      {location && (
        <Map
          mapLib={maplibregl}
          initialViewState={{
            longitude: location?.coords.longitude,
            latitude: location?.coords.latitude,
            zoom: 14,
          }}
          style={{ width: 1300, height: 500 }}
          mapStyle="https://api.maptiler.com/maps/streets/style.json?key=UrDMklIL2mFKyNiUv8tu"
        >
          <NavigationControl />
          <Marker
            longitude={
              location?.coords.longitude ? location?.coords.longitude : 0
            }
            latitude={location?.coords.latitude ? location?.coords.latitude : 0}
          />
        </Map>
      )}
    </>
  );
}
