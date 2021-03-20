import React, { useState } from 'react';
import Head from 'next/head';
import ReactMapGL from 'react-map-gl';

export default function Home() {
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
      />
    </div>
  );
}
