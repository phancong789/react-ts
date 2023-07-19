export default interface IMapInfo {
  full_name: string;
  id: number;
  geometry: { type: string; coordinates: number[][][][] };
  name: string;
  type_data: string;
}
