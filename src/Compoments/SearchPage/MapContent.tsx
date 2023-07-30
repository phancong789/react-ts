import React, { useEffect, useMemo } from "react";
import styled from "styled-components";
import Map, {
  NavigationControl,
  Marker,
  GeolocateControl,
  Source,
  Layer,
  FillLayer,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useAppDispatch, useAppSelector } from "../../CustomHook/hook";
import {
  selectMapInfo,
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
  const [reCall, setReCall] = React.useState(false);
  const { data, isLoading, isFetching, isError } = useGetSpeciesQuery({
    paginate: true,
    page: showMore,
    perpage: 18,
    search: "",
  });
  const dispatch = useAppDispatch();
  const speciesData = useAppSelector(selectSpecies);
  const mapinfo = useAppSelector(selectMapInfo);
  const layerStyle: FillLayer = {
    id: "water",
    type: "fill",
    source: "water",
    paint: {
      "fill-color": "#bf000088",
      "fill-outline-color": "#bf0000",
    },
  };

  var map = useMemo(
    () =>
      mapinfo?.map((map) => {
        return { type: "Feature", geometry: map.geometry };
      }),
    [mapinfo]
  );

  useEffect(() => {
    setReCall(!reCall);
  }, [mapinfo]);
  useEffect(() => {
    if (data) {
      dispatch(setSpeciesData(data));
    }
  }, [data]);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((location) => {
        setLocation(location);
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
            mapboxAccessToken="pk.eyJ1Ijoic3RlcGFua3V6bWluIiwiYSI6Ik1ieW5udm8ifQ.25EOEC2-N92NCWT0Ci9w-Q"
            initialViewState={{
              longitude: 112,
              latitude: 16.6,
              zoom: 5,
            }}
            style={{ width: "100%", height: "100%" }}
            mapStyle="https://tiles.skymapglobal.vn/styles/basic/style.json"
          >
            <NavigationControl position="bottom-right" />
            <GeolocateControl position="bottom-right" />
            <Source
              id="my-data"
              type="geojson"
              data={{
                type: "FeatureCollection",
                features: map,
              }}
            >
              <Layer {...layerStyle} />
            </Source>

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
