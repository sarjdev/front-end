export interface LocationInfo {
  id: number;
  title: string;
  location: LocationDetail;
  geoLocation: GeoLocation;
  operator: Operators;
  reservationUrl: string;
  phone: string;
  stationActive: boolean;
  plugs: Plug[];
  plugsTotal: number;
  provider: string;
  paymentTypes: PaymentType[];
  provideLiveStats: boolean;
}

export interface GeoLocation {
  lat: number;
  lon: number;
}

export interface LocationDetail {
  cityId: number;
  cityName: null;
  districtId: number;
  districtName: null;
  address: string;
  lat: number;
  lon: number;
}

export enum PaymentTypes {
  Mobilodeme = "MOBILODEME"
}

export interface Operators {
  id: number;
  title: string;
  brand: string;
}

export interface PaymentType {
  name: PaymentTypes;
}

export interface Plug {
  id: number;
  type: Types;
  subType: SubTypes;
  socketNumber: string;
  power: number;
  price: number;
  count: number;
}

export enum SubTypes {
  ACType2 = "AC_TYPE2",
  DcCcs = "DC_CCS"
}

export enum Types {
  AC = "AC",
  Dc = "DC"
}

export enum Providers {
  Epdk = "EPDK"
}
