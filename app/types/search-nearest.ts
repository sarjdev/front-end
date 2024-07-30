import { LocationInfo } from "./common";

export interface SearchNearest {
  total: number;
  distance: number;
  distanceUnit: string;
  chargingStations: SearchNearestChargingStation[];
}

export interface SearchNearestChargingStation extends LocationInfo {
  distance: number;
}
