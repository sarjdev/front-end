export interface LocationData {
  chargingStations: LocationResponse[];
}

export interface LocationResponse {
  id: string;
  location: Location;
  title?: string;
  address?: string;
  city?: string;
  pointOfInterests?: string[];
  plugsTotal?: number;
  provider: Providers;
  provideLiveStats?: boolean;
}

export interface Location {
  lat: number;
  lon: number;
}

export type Providers = "ESARJ" | "ZES";

export type EVENT_TYPES = "movestart" | "moveend" | "zoomstart" | "zoomend" | "ready";

export type ClusterPopupData = {
  count: number;
  baseMarker: LocationData;
  markers: any[];
};

export type DeviceType = "mobile" | "desktop";
