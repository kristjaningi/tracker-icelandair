export interface IFlightData {
  hex: string;
  reg_number: string;
  flag: string;
  lat: number;
  lng: number;
  alt: number;
  dir: number;
  speed: number;
  flight_number: string;
  flight_iata: string;
  flight_icao: string;
  dep_iata: string;
  dep_icao: string;
  arr_iata: string;
  arr_icao: string;
  airline_iata: string;
  airline_icao: string;
  aircraft_icao: string;
  status: string;
  updated: number;
  dep_time: string;
  arr_time: string;
}
