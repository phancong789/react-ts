import React, { useEffect } from "react";
import styled from "styled-components";
import Map, {
  NavigationControl,
  Marker,
  GeolocateControl,
} from "react-map-gl/maplibre";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useAppDispatch, useAppSelector } from "../../CustomHook/hook";
import {
  selectSpecies,
  setSpeciesData,
} from "../../features/HomeAndSearchSlice";
import { useGetSpeciesQuery } from "../../service/HomeAndSearchApi";
import SpeciesCard from "../Shared/SpeciesCard";
import { Button, Col } from "react-bootstrap";

const Titles = styled.p`
  font-weight: bold;
  font-size: 1.4rem;
  margin-left: 1rem;
  margin-top: 1rem;
`;

export default function MapContent() {
  const [location, setLocation] = React.useState<GeolocationPosition>();
  const [showMore, setShowMore] = React.useState(1);
  const { data, isLoading, isFetching, isError } = useGetSpeciesQuery({
    paginate: true,
    page: showMore,
    perpage: 18,
    search: "",
  });
  const dispatch = useAppDispatch();
  const speciesData = useAppSelector(selectSpecies);

  React.useEffect(() => {
    if (data) {
      dispatch(setSpeciesData(data));
      console.log("hello");
    }
  }, [data]);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((location) => {
        setLocation(location);
        console.log(location);
      });
    }
  }, []);

  return (
    <div className="d-flex">
      <Col
        xxl={3}
        style={{ padding: "0 5px", overflowY: "scroll", maxHeight: "50rem" }}
      >
        <Titles>Kết quả {`(${speciesData?.pagination.total})`}</Titles>
        {isFetching || isLoading ? (
          <h1 style={{ textAlign: "center" }}>is loading</h1>
        ) : (
          speciesData?.list.map((species) => (
            <SpeciesCard Specie={species} hasImg={false} showOnMap={true} />
          ))
        )}
        <div className="mb-2 d-flex justify-content-center">
          <Button
            variant="none border-bottom fs-4 border-2"
            onClick={() => {
              setShowMore(showMore + 1);
            }}
          >
            tải thêm
          </Button>
        </div>
      </Col>
      <div style={{ width: "100%", minHeight: "100%" }}>
        {location && (
          <Map
            mapLib={maplibregl}
            initialViewState={{
              longitude: 112,
              latitude: 16.6,
              zoom: 5,
            }}
            style={{ width: "100%", height: "100%" }}
            mapStyle="https://api.maptiler.com/maps/streets/style.json?key=UrDMklIL2mFKyNiUv8tu"
          >
            <NavigationControl position="bottom-right" />
            <GeolocateControl position="bottom-right" />
            {/* <Marker
              longitude={
                location?.coords.longitude ? location?.coords.longitude : 0
              }
              latitude={
                location?.coords.latitude ? location?.coords.latitude : 0
              }
            /> */}
          </Map>
        )}
      </div>
    </div>
  );
}
