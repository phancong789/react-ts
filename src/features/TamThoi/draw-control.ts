import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { useControl } from "react-map-gl/maplibre";

import type { MapRef, ControlPosition } from "react-map-gl/maplibre";

type DrawControlProps = ConstructorParameters<typeof MapboxDraw>[0] & {
  position?: ControlPosition;

  onCreate?: (evt: { features: object[] }) => void;
  onUpdate?: (evt: { features: object[]; action: string }) => void;
  onDelete?: (evt: { features: object[] }) => void;
};

export default function DrawControl(props: DrawControlProps) {
  useControl<MapboxDraw>(
    ({ map }) => {
      map.on("draw.create", props.onCreate);
      map.on("draw.update", props.onUpdate);
      map.on("draw.delete", props.onDelete);
      return new MapboxDraw(props);
    },
    ({ map }) => {
      map.off("draw.create", props.onCreate);
      map.off("draw.update", props.onUpdate);
      map.off("draw.delete", props.onDelete);
    },
    {
      position: props.position,
    }
  );

  return null;
}

DrawControl.defaultProps = {
  onCreate: () => {},
  onUpdate: () => {},
  onDelete: () => {},
};
