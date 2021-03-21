import { IFlightData } from '../types';
import { formatAirportCode } from '../helpers';
import useSWR from 'swr';

interface Props {
  flights: IFlightData[];
}

async function fetcher(...args: any) {
  const [url] = args;

  const res = await fetch(url);
  const data = await res.json();

  return data;
}

function getAirplaneName(faFlightID: string, ident: string) {
  const { data, error } = useSWR(`/api/airplaneName?faFlightID=${faFlightID}`, fetcher);

  if (error) return ident;
  if (!data) return 'Loading...';

  // console.log(data.result);

  return data.result;
}

export default function Sidebar({ flights }: Props) {
  console.log(flights);

  return (
    <div className="hidden sm:flex flex-col bg-white w-1/3 2xl:w-1/4 shadow-md pt-2 border-gray-500">
      <h2 className="font-mono text-xl text-center border-b-2 pb-2 text-iceblue">Current Flights</h2>

      <div className="flex-grow">
        {flights ? (
          flights.map((flight: IFlightData) => (
            <div key={flight.faFlightID} className="p-3 border-b-2">
              <div className="flex">
                <img className="" src="/logo-small.png" width="35" />
                <div className="font-semibold text-lg ml-3">{getAirplaneName(flight.faFlightID, flight.ident)}</div>
              </div>
              <div className="flex flex-row justify-between items-center mt-3">
                <div className="">
                  <div className="text-xs text-gray-500">Origin</div>
                  <div className="">{formatAirportCode(flight.origin)}</div>
                </div>

                <svg
                  className=""
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

                <div className="">
                  <div className="text-xs text-gray-500">Dest.</div>
                  <div className="">{formatAirportCode(flight.destination)}</div>
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

      <div className="flex justify-center m-3 text-sm font-mono">made by @kristjaningi</div>
    </div>
  );
}
