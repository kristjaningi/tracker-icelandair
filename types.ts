export interface IFlightData {
  altitude: number;
  altitudeChange: string;
  altitudeStatus: string;
  arrivalTime: number;
  departureTime: number;
  destination: string;
  faFlightID: string;
  firstPositionTime: number;
  groundspeed: number;
  heading: number;
  highLatitude: number;
  highLongitude: number;
  ident: string;
  latitude: number;
  longitude: number;
  lowLatitude: number;
  lowLongitude: number;
  origin: string;
  prefix: string;
  suffix: string;
  timeout: string;
  timestamp: number;
  type: string;
  updateType: string;
  waypoints: string;
}
