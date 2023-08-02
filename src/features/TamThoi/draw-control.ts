import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { useControl } from "react-map-gl/maplibre";

import type { ControlPosition } from "react-map-gl/maplibre";

type DrawControlProps = ConstructorParameters<typeof MapboxDraw>[0] & {
  position?: ControlPosition;
  mode?: string;

  onCreate?: (evt: { features: object[] }) => void;
  onUpdate?: (evt: { features: object[]; action: string }) => void;
  onDelete?: (evt: { features: object[] }) => void;
  onModeChange?: (e: any) => void;
};

export default function DrawControl(props: DrawControlProps) {
  const draw = new MapboxDraw(props);
  useControl<MapboxDraw>(
    ({ map }) => {
      if (props.onCreate) map.on("draw.create", props.onCreate);
      if (props.onUpdate) map.on("draw.update", props.onUpdate);
      if (props.onDelete) map.on("draw.delete", props.onDelete);
      if (props.onModeChange) map.on("draw.modechange", props.onModeChange);
      return draw;
    },
    ({ map }) => {
      map.off("draw.create", props.onCreate);
      map.off("draw.update", props.onUpdate);
      map.off("draw.delete", props.onDelete);
      if (props.onModeChange) map.on("draw.modechange", props.onModeChange);
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
  onModeChange: () => {},
};
