export interface LocationData {
  chargingStations: LocationResponse[];
}

export interface FilteredLocationData {
  chargingStations: LocationResponse[];
  total: number;
  distance: number;
  distanceUnit: string;
}

export interface FilteredLocationResponse {
  data: FilteredLocationData;
  config: any;
  request: any;
  headers: any;
  status: number;
}

export interface FilterFormRequest {
  latitude: number;
  longitude: number;
  distance: number;
  size: number;
}

export interface ChargingStationData {
  id: string;
  location: Location;
  title?: string;
  address?: string;
  city?: string;
  plugs: Plugs[];
  pointOfInterests?: string[];
  plugsTotal?: number;
  provider: Providers;
  provideLiveStats?: boolean;
}

export type LocationResponse = ChargingStationData;

export interface Location {
  lat: number;
  lon: number;
}

export type TooltipData = ChargingStationData;

export interface Plugs {
  type: PlugType;
  count: number;
  power: string;
}

export type PlugType = "AC" | "DC";

export type status = "active" | "inactive" | "inuse";

export type Providers = "ESARJ" | "ZES" | "SHARZ" | "AKSAENERGY" | "BEEFULL";

export type EVENT_TYPES = "movestart" | "moveend" | "zoomstart" | "zoomend" | "ready";

export type ClusterPopupData = {
  count: number;
  baseMarker: LocationData;
  markers: any[];
};

export type DeviceType = "mobile" | "desktop";

export enum ProvidersEnum {
  ESARJ = "ESARJ",
  ZES = "ZES",
  SHARZ = "SHARZ",
  AKSAENERGY = "AKSAENERGY",
  BEEFULL = "BEEFULL"
}

export type SuggestionChargingStation = {
  id: string;
  location: Location;
  title: string;
};

export type SuggestionLocation = {
  highlightedText: string;
  chargingStation: TooltipData;
};

export type SuggestionSearchResponse = {
  total: number;
  suggestions: SuggestionLocation[];
};
