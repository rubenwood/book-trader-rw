"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import map components to avoid SSR issues
const MapContainer = dynamic<any>(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const CircleMarker = dynamic(
  () => import("react-leaflet").then((mod) => mod.CircleMarker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);
const Tooltip = dynamic(
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


type ShopMapClientProps = {
  shops: {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
  }[];
};

export default function ShopMapClient(props: ShopMapClientProps) {
  const { shops } = props;
  return (
    <>


    <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />

      <MapContainer
        center={[54.5, -4]}
        zoom={6}
        minZoom={5}
        maxZoom={12}
        scrollWheelZoom
        className="h-full w-full"
      >
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {shops.map((shop) => (
          <CircleMarker
            key={shop.id}
            center={[shop.latitude, shop.longitude]}
          >
            <Popup>
              <strong>{shop.name}</strong>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </>
  );
}