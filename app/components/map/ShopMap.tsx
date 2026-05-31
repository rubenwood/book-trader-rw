"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import map components to avoid SSR issues
const MapContainer = dynamic<any>(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic<any>(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const CircleMarker = dynamic<any>(
  () => import("react-leaflet").then((mod) => mod.CircleMarker),
  { ssr: false }
);
const Popup = dynamic<any>(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);
const Tooltip = dynamic<any>(
  () => import("react-leaflet").then((mod) => mod.Tooltip),
  { ssr: false }
);

// Component to handle map right-click events
function MapRightClickHandler({ onRightClick }: { onRightClick: (lat: number, lng: number) => void }) {
  const { useMapEvents } = require("react-leaflet");
  
  useMapEvents({
    contextmenu: (e: { latlng: { lat: number; lng: number }; originalEvent: MouseEvent }) => {
      e.originalEvent.preventDefault();
      onRightClick(e.latlng.lat, e.latlng.lng);
    },
  });
  
  return null;
}


// type ShopMapClientProps = {
//   shops: {
//     id: number;
//     name: string;
//     latitude: number;
//     longitude: number;
//   }[];
// };

const shops: Shop[] = [
  {
    id: "1",
    name: "Barnardos - Ashton",
    latitude: 53.4912713,
    longitude: -2.0976884,
    description: "",
    booksPerDeal: 10,
    dealPrice: 1,
    createdAt: new Date()
  },
  {
    id: "2",
    name: "YMCA - Regent Road",
    latitude: 53.4777003,
    longitude: -2.2643381,
    description: "",
    booksPerDeal: 5,
    dealPrice: 1,
    createdAt: new Date()
  }
];


function onRightClickMap(lat: number, lng: number) {
  console.log(`Right-clicked at: ${lat}, ${lng}`);
}

export default function ShopMapClient() {
  //const { shops } = props;
  
return (
      <MapContainer
        center={[54.5, -4]}
        zoom={6}
        minZoom={0}
        maxZoom={12}
        scrollWheelZoom={true}
        className="h-full w-full"
        style={{ background: "#1a1a2e" }}
      >
        <MapRightClickHandler onRightClick={onRightClickMap} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {shops.map((shop) => (
          <CircleMarker
            key={shop.id}
            center={[shop.latitude, shop.longitude]}
          >
            <Popup>
              <strong>{shop.name}</strong>
              <br />
              {shop.description}
              <br />
              {shop.booksPerDeal} books for £{shop.dealPrice.toFixed(2)}
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
  );
}