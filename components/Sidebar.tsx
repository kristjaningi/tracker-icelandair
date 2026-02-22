'use client';

import React from 'react';
import { format } from 'date-fns';

import { IFlightData } from '@/types';
import { formatAirportCode } from '@/helpers';
import fleet from '@/data/fleet.json';

interface Props {
  flights: IFlightData[];
}

function getAircraftName(regNumber: string, flightIata: string): string {
  const match = fleet.find((a) => a.registration === regNumber);
  return match ? `${match.nickname} (${flightIata})` : flightIata;
}

export default function Sidebar({ flights }: Props) {
  return (
    <div className="hidden sm:flex flex-col bg-white w-1/3 2xl:w-1/4 shadow-md pt-2 border-gray-500">
      <h2 className="font-mono text-xl text-center border-b-2 pb-2 text-iceblue">Current Flights</h2>

      <div className="flex-grow h-8 overflow-auto">
        {flights && flights.length > 0 ? (
          flights.map((flight: IFlightData) => (
            <div key={flight.hex || flight.flight_iata} className="p-3 border-b-2 cursor-pointer hover:bg-gray-50">
              <div className="flex">
                <img src="/logo-small.png" width="35" />
                <div className="font-semibold text-lg ml-3">
                  {getAircraftName(flight.reg_number, flight.flight_iata)}
                </div>
              </div>

              <div className="flex flex-row justify-between items-center mt-3">
                <div className="text-left">
                  <div className="text-xs text-gray-500">Origin</div>
                  <div>{formatAirportCode(flight.dep_iata)}</div>
                </div>

                <svg
                  style={{ transformOrigin: 'center center 0px', transform: 'rotate(90deg)' }}
                  fill="#003a7d"
                  stroke="#003a7d"
                  strokeWidth="0"
                  height="30"
                  width="30"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                >
                  <path d="M10.18 9"></path>
                  <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"></path>
                </svg>

                <div className="text-right">
                  <div className="text-xs text-gray-500">Dest.</div>
                  <div>{formatAirportCode(flight.arr_iata)}</div>
                </div>
              </div>

              <div className="flex justify-between mt-2">
                <div className="text-left">
                  <div className="text-xs text-gray-500">Departure time</div>
                  {flight.dep_time ? format(new Date(flight.dep_time), 'HH:mm') : '--:--'}
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">Altitude</div>
                  {flight.alt != null ? `${Math.round(flight.alt * 3.281)} ft.` : '—'}
                </div>
              </div>

              <div className="flex justify-between mt-2">
                <div className="text-left">
                  <div className="text-xs text-gray-500">Speed</div>
                  {flight.speed != null ? `${Math.round(flight.speed * 0.54)} kt` : '—'}
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">Heading</div>
                  {flight.dir}°
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col justify-center items-center h-full flex-grow border-2">
            <img className="px-10" src="/icelandair-aircraft.svg" />
            <div className="text-bold text-xl font-mono mt-4">No Flights</div>
          </div>
        )}
      </div>

      <div className="flex justify-center m-3 text-xs font-mono">made by @kristjaningi</div>
    </div>
  );
}
