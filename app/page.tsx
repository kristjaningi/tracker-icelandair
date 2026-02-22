import { IFlightData } from '@/types';
import HomeClient from './home-client';

export default async function Page() {
  let flights: IFlightData[] = [];

  try {
    const res = await fetch(
      `https://airlabs.co/api/v9/flights?airline_iata=FI&api_key=${process.env.AIRLABS_API_KEY}`,
      { cache: 'no-store' }
    );
    const data = await res.json();
    flights = data.response ?? [];
  } catch {
    flights = [];
  }

  return <HomeClient flights={flights} />;
}
