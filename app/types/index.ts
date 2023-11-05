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

export interface TooltipData {
  id: string;
  location: Location;
  title: string;
  plugs: Plugs[];
  address: string;
  pointOfInterests: [];
  plugsTotal: number;
  provider: Providers;
  provideLiveStats: boolean;
}

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

export type CustomPopupType = {
  tooltipData: TooltipData | null;
  getPlugData: (type: PlugType, data: "count" | "power") => string | number;
  checkPlugsType: (type: PlugType) => boolean;
  handleClickProvider: (company: Providers) => string;
};

export enum ProvidersEnum {
  ESARJ = "ESARJ",
  ZES = "ZES",
  SHARZ = "SHARZ",
  AKSAENERGY = "AKSAENERGY",
  BEEFULL = "BEEFULL"
}
