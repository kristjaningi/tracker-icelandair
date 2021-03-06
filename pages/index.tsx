import React, { useContext, useState } from 'react';
import Head from 'next/head';
import ReactMapGL, { Layer, MapContext, Source } from 'react-map-gl';
import Sidebar from '../components/Sidebar';
import AircraftIcon from '../assets/AircraftIcon';

function AircraftMarker(props: any) {
  const context = useContext(MapContext);

  const { longitude, latitude, flight } = props;

  const [x, y]: any = context.viewport?.project([longitude, latitude]);

  return (
    <div className="flex flex-col justify-center" style={{ position: 'absolute', left: x, top: y }}>
      <AircraftIcon color="#ffb600" size={40} direction={flight.heading} />
      <p className="text-white text-sm font-bold">{flight.ident}</p>
    </div>
  );
}

function Home({ data }: any) {
  const [viewport, setViewport] = useState({
    latitude: 63.0,
    longitude: -20.982,
    zoom: 3,
  });

  const settings = {
    dragPan: true,
    dragRotate: false,
    scrollZoom: true,
    touchZoom: true,
    touchRotate: true,
    keyboard: true,
    doubleClickZoom: true,
    minZoom: 0,
    maxZoom: 20,
    minPitch: 0,
    maxPitch: 85,
  };

  const geojson = {
    type: 'FeatureCollection',
    features: [
      { type: 'Feature', geometry: { type: 'Point', coordinates: [-22.6303749, 63.9814892] } },
      { type: 'Feature', geometry: { type: 'Point', coordinates: [-0.2416797, 51.5287718] } },
      { type: 'Feature', geometry: { type: 'Point', coordinates: [4.7241943, 52.3154298] } },
      { type: 'Feature', geometry: { type: 'Point', coordinates: [12.5237848, 55.6713442] } },
      { type: 'Feature', geometry: { type: 'Point', coordinates: [-71.0117489, 42.3656171] } },
      { type: 'Feature', geometry: { type: 'Point', coordinates: [-74.1197631, 40.6976637] } },
      { type: 'Feature', geometry: { type: 'Point', coordinates: [-79.5181399, 43.7184038] } },
      { type: 'Feature', geometry: { type: 'Point', coordinates: [2.0787284, 41.3948976] } },
      { type: 'Feature', geometry: { type: 'Point', coordinates: [13.2846508, 52.5069704] } },
      { type: 'Feature', geometry: { type: 'Point', coordinates: [-14.4039127, 65.2616276] } },
      { type: 'Feature', geometry: { type: 'Point', coordinates: [-18.2054355, 65.6693289] } },
    ],
  };

  const layerStyle = {
    id: 'point',
    type: 'circle',
    paint: {
      'circle-radius': 5,
      'circle-color': '#ffb600',
      'circle-stroke-color': 'white',
      'circle-stroke-width': 1,
    },
  };

  return (
    <div className="flex">
      <Head>
        <title>Icelandair Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Sidebar flights={data.aircraft} />

      <ReactMapGL
        {...viewport}
        {...settings}
        width="100vw"
        height="100vh"
        onViewportChange={(
          viewport: React.SetStateAction<{
            latitude: number;
            longitude: number;
            zoom: number;
          }>
        ) => setViewport(viewport)}
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        mapStyle="mapbox://styles/kristjaningi/ckmczevhelcf617p6lxx6yga2"
      >
        {data.aircraft &&
          data.aircraft.map((flight: { faFlightID: string; longitude: number; latitude: number }) => {
            // console.log(flight);

            return (
              <AircraftMarker
                key={flight.faFlightID}
                longitude={flight.longitude}
                latitude={flight.latitude}
                flight={flight}
              />
            );
          })}

        {/* @ts-ignore */}
        <Source id="my-data" type="geojson" data={geojson}>
          {/* @ts-ignore */}
          <Layer {...layerStyle} />
        </Source>
      </ReactMapGL>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(
    // Get all active in air Icelandair flights
    `https://flightxml.flightaware.com/json/FlightXML2/SearchBirdseyeInFlight?query={match ident ICE*} {true inAir}`,
    {
      headers: {
        authorization: `Basic ${process.env.FLIGHT_AWARE_API_KEY}`,
      },
    }
  );

  // console.log('FETCHING DATA');

  const data = await res.json();

  if (data.error) {
    return {
      props: {
        data: [],
      },
    };
  }

  return {
    props: { data: data?.SearchBirdseyeInFlightResult },
  };
}

export default Home;
