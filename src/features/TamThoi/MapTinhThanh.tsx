import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import MapGL, {
  NavigationControl,
  GeolocateControl,
  Source,
  Layer,
  FillLayer,
  Popup,
  useControl,
} from "react-map-gl/maplibre";
import maplibregl from "maplibre-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "maplibre-gl/dist/maplibre-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { useAppDispatch, useAppSelector } from "../../CustomHook/hook";
import { Button, Col, Nav, Row } from "react-bootstrap";
import { useLazyGetProvinceQuery } from "./ProvinceApi";
import { selectMapinfo, selectProvinces } from "./ProvinceSlice";
import ProvinceCard from "./ProvinceCard";
import * as env from "../../env";
import { DrawPolygonMode, Editor } from "react-map-gl-draw";
import DrawControl from "./draw-control";

const Titles = styled.p`
  font-weight: bold;
  font-size: 1.4rem;
  margin-left: 1rem;
  margin-top: 1rem;
`;

function DrawControl(props: DrawControlProps) {
  useControl(() => new MapboxDraw(props), {
    position: props.position,
  });

  return null;
}

export default function MapTinhThanh() {
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
  const [triger] = useLazyGetProvinceQuery();
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

  const [features, setFeatures] = useState({});

  const onUpdate = useCallback((e: any) => {
    setFeatures((currFeatures) => {
      const newFeatures = { ...currFeatures };
      for (const f of e.features) {
        newFeatures[f.id] = f;
      }
      return newFeatures;
    });
  }, []);

  const onDelete = useCallback((e: any) => {
    setFeatures((currFeatures) => {
      const newFeatures = { ...currFeatures };
      for (const f of e.features) {
        delete newFeatures[f.id];
      }
      return newFeatures;
    });
  }, []);

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
  useEffect(() => {
    triger(0);
  }, []);
  return (
    <div className="d-flex" style={{ minHeight: "100%" }}>
      <Col xxl={3} style={{ padding: "0 5px" }}>
        <Nav variant="pills" defaultActiveKey={0}>
          <Nav.Item>
            <Nav.Link eventKey={0} as="button">
              Province
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={1} as="button">
              Custom Data
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Titles>Kết quả {`(${ProvinceData?.pagination.total})`}</Titles>
        <div
          style={{ overflowY: "scroll", maxHeight: "83%" }}
          className="mb-2 d-flex flex-column"
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
              env.getProvinParams.set(
                "page",
                (Number(env.getProvinParams.get("page")) + 1).toString()
              );
              triger(1);
            }}
          >
            tải thêm
          </Button>
        </div>
      </Col>
      <div style={{ width: "100%", minHeight: "100%" }}>
        <MapGL
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
          <DrawControl
            position="top-left"
            displayControlsDefault={false}
            controls={{
              polygon: true,
              trash: true,
            }}
            defaultMode="draw_polygon"
            onCreate={onUpdate}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
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
        </MapGL>
      </div>
    </div>
  );
}
