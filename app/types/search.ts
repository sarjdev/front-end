import { GeoLocation } from "./common";

export interface Search {
  chargingStations: ChargingStation[];
}

export interface ChargingStation {
  id: number;
  geoLocation: GeoLocation;
  operator: ChargingStationOperator;
}

export interface ChargingStationOperator {
  id: number;
}
