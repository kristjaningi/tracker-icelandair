import { IFlightData } from '../types';

interface Props {
  flights: IFlightData[];
}

export default function Sidebar({ flights }: Props) {
  console.log(flights);

  return (
    <div className="hidden sm:flex flex-col bg-white w-1/3 2xl:w-1/4 shadow-md pt-2 border-gray-500">
      <h2 className="font-mono text-xl text-center border-b-2 pb-2 text-iceblue">Current Flights</h2>

      <div className="flex-grow">
        {flights ? (
          flights.map((flight: IFlightData) => (
            <div key={flight.faFlightID} className="p-4 border-b-2">
              <div className="flex">
                <div className="font-semibold text-lg">{flight.ident}</div>
              </div>
              <div className="flex flex-row justify-between items-center mt-2">
                <div className="">
                  <div className="text-xs text-gray-500">Origin</div>
                  <div className="">{flight.origin}</div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col justify-center items-center h-full flex-grow border-2">
            <div className="text-bold text-xl font-mono">No Flights</div>
          </div>
        )}
      </div>
    </div>
  );
}
