import { GeoLocation } from "./common";

export interface SearchDetail {
  id: number;
  title: string;
  location: SearchDetailLocation;
  geoLocation: GeoLocation;
  operator: SearchDetailOperator;
  reservationUrl: string;
  phone: string;
  stationActive: boolean;
  plugs: SearchDetailPlug[];
  plugsTotal: number;
  provider: string;
  paymentTypes: SearchDetailPaymentType[];
  provideLiveStats: boolean;
}

export interface SearchDetailLocation {
  cityId: number;
  cityName: null;
  districtId: number;
  districtName: null;
  address: string;
  lat: number;
  lon: number;
}

export interface SearchDetailOperator {
  id: number;
  title: string;
  brand: string;
}

export interface SearchDetailPaymentType {
  name: string;
}

export interface SearchDetailPlug {
  id: number;
  type: string;
  subType: string;
  socketNumber: string;
  power: number;
  price: number;
  count: number;
}
