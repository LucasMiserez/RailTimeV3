export interface disturbanceplanned {
  id: string;
  type: string;
  title: string;
  description: string;
}

export interface RootDepartures {
  version: string;
  timestamp: string;
  station: string;
  stationinfo: Stationinfo;
  departures: Departures;
}

export interface RootConnections {
  version: string;
  timestamp: string;
  connection: Connection[];
}

export interface Departures {
  number: string;
  departure: Departure[];
}

export interface Station {
  version: string;
  timestamp: number;
  station: StationClass;
}

export interface StationClass {
  id: string;
  "@id": string;
  locationX: number;
  locationY: number;
  standardname: string;
  name: string;
}
export interface Connection {
  id: string;
  departure: Departure;
  arrival: Arrival;
  vias?: Vias;
  duration: string;
  remarks: Remarks;
  alerts: Alerts;
}

export interface Departure {
  delay: string;
  station: string;
  stationinfo: Stationinfo;
  time: string;
  vehicle: string;
  vehicleinfo: Vehicleinfo;
  platform: string;
  platforminfo: Platforminfo;
  canceled: string;
  stops: Stops;
  departureConnection: string;
  direction: Direction;
  left: string;
  walking: string;
}

export interface Stationinfo {
  locationX: string;
  locationY: string;
  id: string;
  name: string;
  "@id": string;
  standardname: string;
}

export interface Vehicleinfo {
  name: string;
  shortname: string;
  number: string;
  type: string;
  locationX: string;
  locationY: string;
  "@id": string;
}

export interface Platforminfo {
  name: string;
  normal: string;
}

export interface Stops {
  number: string;
  stop: Stop[];
}

export interface Stop {
  id: string;
  station: string;
  stationinfo: Stationinfo2;
  scheduledArrivalTime: string;
  arrivalCanceled: string;
  arrived: string;
  scheduledDepartureTime: string;
  arrivalDelay: string;
  departureDelay: string;
  departureCanceled: string;
  left: string;
  isExtraStop: string;
  platform: string;
  platforminfo: Platforminfo2;
}

export interface Stationinfo2 {
  locationX: string;
  locationY: string;
  id: string;
  name: string;
  "@id": string;
  standardname: string;
}

export interface Platforminfo2 {
  name: string;
  normal: string;
}

export interface Direction {
  name: string;
}

export interface Arrival {
  delay: string;
  station: string;
  stationinfo: Stationinfo3;
  time: string;
  vehicle: string;
  vehicleinfo: Vehicleinfo2;
  platform: string;
  platforminfo: Platforminfo3;
  canceled: string;
  direction: Direction2;
  arrived: string;
  walking: string;
}

export interface Stationinfo3 {
  locationX: string;
  locationY: string;
  id: string;
  name: string;
  "@id": string;
  standardname: string;
}

export interface Vehicleinfo2 {
  name: string;
  shortname: string;
  number: string;
  type: string;
  locationX: string;
  locationY: string;
  "@id": string;
}

export interface Platforminfo3 {
  name: string;
  normal: string;
}

export interface Direction2 {
  name: string;
}

export interface Vias {
  number: string;
  via: Vum[];
}

export interface Vum {
  id: string;
  arrival: Arrival2;
  departure: Departure2;
  timeBetween: string;
  station: string;
  stationinfo: Stationinfo5;
  vehicle: string;
  vehicleinfo: Vehicleinfo5;
  direction: Direction5;
}

export interface Arrival2 {
  time: string;
  platform: string;
  platforminfo: Platforminfo4;
  isExtraStop: string;
  canceled: string;
  delay: string;
  arrived: string;
  walking: string;
  direction: Direction3;
  vehicle: string;
  vehicleinfo: Vehicleinfo3;
  departureConnection: string;
}

export interface Platforminfo4 {
  name: string;
  normal: string;
}

export interface Direction3 {
  name: string;
}

export interface Vehicleinfo3 {
  name: string;
  shortname: string;
  number: string;
  type: string;
  locationX: string;
  locationY: string;
  "@id": string;
}

export interface Departure2 {
  time: string;
  platform: string;
  platforminfo: Platforminfo5;
  isExtraStop: string;
  canceled: string;
  delay: string;
  left: string;
  walking: string;
  direction: Direction4;
  vehicle: string;
  vehicleinfo: Vehicleinfo4;
  stops: Stops2;
  departureConnection: string;
}

export interface Platforminfo5 {
  name: string;
  normal: string;
}

export interface Direction4 {
  name: string;
}

export interface Vehicleinfo4 {
  name: string;
  shortname: string;
  number: string;
  type: string;
  locationX: string;
  locationY: string;
  "@id": string;
}

export interface Stops2 {
  number: string;
  stop: Stop2[];
}

export interface Stop2 {
  id: string;
  station: string;
  stationinfo: Stationinfo4;
  scheduledArrivalTime: string;
  arrivalCanceled: string;
  arrived: string;
  scheduledDepartureTime: string;
  arrivalDelay: string;
  departureDelay: string;
  departureCanceled: string;
  left: string;
  isExtraStop: string;
  platform: string;
  platforminfo: Platforminfo6;
}

export interface Stationinfo4 {
  locationX: string;
  locationY: string;
  id: string;
  name: string;
  "@id": string;
  standardname: string;
}

export interface Platforminfo6 {
  name: string;
  normal: string;
}

export interface Stationinfo5 {
  locationX: string;
  locationY: string;
  id: string;
  name: string;
  "@id": string;
  standardname: string;
}

export interface Vehicleinfo5 {
  name: string;
  shortname: string;
  number: string;
  type: string;
  locationX: string;
  locationY: string;
  "@id": string;
}

export interface Direction5 {
  name: string;
}

export interface Remarks {
  number: string;
  remark: any[];
}

export interface Alerts {
  number: string;
  alert: any[];
}
