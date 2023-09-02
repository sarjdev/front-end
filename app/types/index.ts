export interface LocationData {
    chargingStations: LocationResponse[];
}

export interface LocationResponse {
  id: string;
  location: Location;
  title: string;
  address: string;
  city: string;
  pointOfInterests: string[];
  plugsTotal: number;
  provider: Providers;
  provideLiveStats: boolean;
}

export interface Location {
    lat: number;
    lon: number;
}

export type Providers = 'ESARJ' | 'ZES'; 
