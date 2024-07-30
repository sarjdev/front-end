import { LocationInfo, PaymentTypes } from "./common";

export type SearchDetail = LocationInfo;

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
  name: PaymentTypes;
}
