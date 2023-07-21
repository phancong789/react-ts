import React, { useEffect, useMemo } from "react";
import styled from "styled-components";
import Map, {
  NavigationControl,
  Marker,
  GeolocateControl,
  Source,
  Layer,
  FillLayer,
} from "react-map-gl/maplibre";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useAppDispatch, useAppSelector } from "../../CustomHook/hook";
import { Button, Col } from "react-bootstrap";
import { useGetProvinceQuery } from "./ProvinceApi";
import { selectProvinces } from "./ProvinceSlice";

const Titles = styled.p`
  font-weight: bold;
  font-size: 1.4rem;
  margin-left: 1rem;
  margin-top: 1rem;
`;

export default function MapTinhThanh() {
  const [showMore, setShowMore] = React.useState(1);
  const [reCall, setReCall] = React.useState(false);
  const { data, isLoading, isFetching, isError } = useGetProvinceQuery(0);
  const dispatch = useAppDispatch();
  const speciesData = useAppSelector(selectProvinces);
  const layerStyle: FillLayer = {
    id: "water",
    type: "fill",
    source: "water",
    paint: {
      "fill-color": "#bf000088",
      "fill-outline-color": "#bf0000",
    },
  };

  return (
    <div className="d-flex" style={{ minHeight: "100%" }}>
      <Col
        xxl={3}
        style={{ padding: "0 5px", overflowY: "scroll", maxHeight: "50rem" }}
      >
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
        <Map
          mapLib={maplibregl}
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
              features: [],
            }}
          >
            <Layer {...layerStyle} />
          </Source>
        </Map>
      </div>
    </div>
  );
}
