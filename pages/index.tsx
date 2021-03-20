import React, { useContext, useState } from 'react';
import Head from 'next/head';
import ReactMapGL, { MapContext } from 'react-map-gl';
import Sidebar from '../components/Sidebar';

function AircraftMarker(props) {
  const context = useContext(MapContext);

  const { longitude, latitude, flight } = props;

  // console.log(flight);

  const [x, y] = context.viewport?.project([longitude, latitude]);

  return (
    <div className="flex flex-col justify-center" style={{ position: 'absolute', left: x, top: y }}>
      <p className="text-red-400">{flight.ident}</p>
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

  return (
    <div className="flex">
      <Head>
        <title>Icelandair Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Sidebar flights={data} />

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
        {data.map((flight) => {
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
  const data = await res.json();

  if (!data) {
    console.log('NO DATA');
  }

  return {
    props: { data: data.SearchBirdseyeInFlightResult.aircraft },
  };
}

export default Home;
