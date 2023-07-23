import React, { useCallback, useEffect, useMemo } from "react";
import styled from "styled-components";
import Map, {
  NavigationControl,
  GeolocateControl,
  Source,
  Layer,
  FillLayer,
  Popup,
} from "react-map-gl/maplibre";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useAppDispatch, useAppSelector } from "../../CustomHook/hook";
import { Button, Col } from "react-bootstrap";
import { useGetProvinceQuery } from "./ProvinceApi";
import { selectMapinfo, selectProvinces } from "./ProvinceSlice";
import ProvinceCard from "./ProvinceCard";

const Titles = styled.p`
  font-weight: bold;
  font-size: 1.4rem;
  margin-left: 1rem;
  margin-top: 1rem;
`;

export default function MapTinhThanh() {
  const [showMore, setShowMore] = React.useState(1);
  const [reCall, setReCall] = React.useState(false);
  const [popup, setpopup] = React.useState<{
    longitude: number;
    latitude: number;
    name: string;
    code: number;
    id: number;
    fullName: string;
    type_data: string;
    centerPoint: {
      type: string;
      coordinates: number[];
    };
  } | null>(null);
  useGetProvinceQuery(0);
  const ProvinceData = useAppSelector(selectProvinces);
  const MapinfoData = useAppSelector(selectMapinfo);
  const layerStyle: FillLayer = {
    id: "water",
    type: "fill",
    source: "water",
    paint: {
      "fill-color": "#bf000088",
      "fill-outline-color": "#bf0000",
    },
  };
  let map = MapinfoData.map((x) => ({
    type: "Feature",
    properties: {
      name: x.name,
      code: x.code,
      id: x.id,
      type_data: x.type_data,
      centerPoint: x.center_point,
      fullName: x.full_name,
    },
    geometry: x.geometry,
  }));
  useEffect(() => {
    setReCall(!reCall);
  }, [JSON.stringify(MapinfoData)]);

  const openPopUpHandle = useCallback((e: any) => {
    const feature = e.features && e.features[0];
    setpopup({
      longitude: e.lngLat.lng,
      latitude: e.lngLat.lat,
      name: feature.properties.name,
      code: feature.properties.code,
      id: feature.properties.id,
      centerPoint: feature.properties.centerPoint,
      fullName: feature.properties.fullName,
      type_data: feature.properties.type_data,
    });
    console.log("", feature);
  }, []);

  return (
    <div className="d-flex" style={{ minHeight: "100%" }}>
      <Col xxl={3} style={{ padding: "0 5px" }}>
        <Titles>Kết quả {`(${ProvinceData?.pagination.total})`}</Titles>
        <div
          style={{ overflowY: "scroll", maxHeight: "83%" }}
          className="mb-2 d-flex flex-column justify-content-center"
        >
          {ProvinceData?.list.map((p) => (
            <ProvinceCard province={p} />
          ))}
        </div>
        <div style={{ height: 30 }} className="position-relative">
          <Button
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            variant="none border-bottom m-auto fs-4 border-2"
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
          onClick={openPopUpHandle}
          interactive={true}
          interactiveLayerIds={["water"]}
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
          {popup && (
            <Popup
              longitude={popup.longitude}
              latitude={popup.latitude}
              anchor="center"
              onClose={() => {
                setpopup(null);
              }}
            >
              <b>
                Tên dầy đủ: <br /> {popup.fullName}
              </b>
              <p>Mã tình thành: {popup.code}</p>
              <p>ID của tình thành: {popup.id}</p>
              <p>Loại: {popup.type_data}</p>
            </Popup>
          )}
        </Map>
      </div>
    </div>
  );
}
