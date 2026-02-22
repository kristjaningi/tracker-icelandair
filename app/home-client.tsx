'use client';

import React, { useState } from 'react';
import Map, { Marker, Source, Layer } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

import { IFlightData } from '@/types';
import Sidebar from '@/components/Sidebar';
import AircraftIcon from '@/assets/AircraftIcon';

const geojson: GeoJSON.FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    { type: 'Feature', properties: {}, geometry: { type: 'Point', coordinates: [-22.6303749, 63.9814892] } },
    { type: 'Feature', properties: {}, geometry: { type: 'Point', coordinates: [-0.2416797, 51.5287718] } },
    { type: 'Feature', properties: {}, geometry: { type: 'Point', coordinates: [4.7241943, 52.3154298] } },
    { type: 'Feature', properties: {}, geometry: { type: 'Point', coordinates: [12.5237848, 55.6713442] } },
    { type: 'Feature', properties: {}, geometry: { type: 'Point', coordinates: [-71.0117489, 42.3656171] } },
    { type: 'Feature', properties: {}, geometry: { type: 'Point', coordinates: [-74.1197631, 40.6976637] } },
    { type: 'Feature', properties: {}, geometry: { type: 'Point', coordinates: [-79.5181399, 43.7184038] } },
    { type: 'Feature', properties: {}, geometry: { type: 'Point', coordinates: [2.0787284, 41.3948976] } },
    { type: 'Feature', properties: {}, geometry: { type: 'Point', coordinates: [13.2846508, 52.5069704] } },
    { type: 'Feature', properties: {}, geometry: { type: 'Point', coordinates: [-14.4039127, 65.2616276] } },
    { type: 'Feature', properties: {}, geometry: { type: 'Point', coordinates: [-18.2054355, 65.6693289] } },
  ],
};

const layerStyle: mapboxgl.CircleLayerSpecification = {
  id: 'point',
  type: 'circle',
  source: 'airports',
  paint: {
    'circle-radius': 5,
    'circle-color': '#ffb600',
    'circle-stroke-color': 'white',
    'circle-stroke-width': 1,
  },
};

export default function HomeClient({ flights }: { flights: IFlightData[] }) {
  return (
    <div className="flex">
      <Sidebar flights={flights} />

      <Map
        initialViewState={{
          latitude: 63.0,
          longitude: -20.982,
          zoom: 3,
        }}
        style={{ width: '100vw', height: '100vh' }}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        mapStyle="mapbox://styles/kristjang/cluu3z9y4003f01qz8mgx18x7"
        dragRotate={false}
      >
        {flights.map((flight) => (
          <Marker key={flight.hex || flight.flight_iata} longitude={flight.lng} latitude={flight.lat} anchor="center">
            <div className="flex flex-col items-center">
              <AircraftIcon color="#ffb600" size={40} direction={flight.dir} />
              <p className="text-iceblue text-sm font-bold">{flight.flight_iata}</p>
            </div>
          </Marker>
        ))}

        <Source id="airports" type="geojson" data={geojson}>
          <Layer {...layerStyle} />
        </Source>
      </Map>
    </div>
  );
}
