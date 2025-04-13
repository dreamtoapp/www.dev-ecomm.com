"use client";

import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

interface LocationMapProps {
  lat?: number;
  lng?: number;
}

const LocationMap = ({ lat, lng }: LocationMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  }>();
  const [mapError, setMapError] = useState<string>("");
  const [map, setMap] = useState<google.maps.Map>();
  const [marker, setMarker] = useState<google.maps.Marker>();

  // Get current location if no coordinates are provided
  useEffect(() => {
    if (!lat || !lng) {
      if (!navigator.geolocation) {
        setMapError("Geolocation is not supported by your browser");
        return;
      }

      const geoTimeout = setTimeout(() => {
        setMapError("Unable to retrieve your location");
      }, 10000);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          clearTimeout(geoTimeout); // Corrected here
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          setMapError("Unable to retrieve your location");
          clearTimeout(geoTimeout); // And here
        }
      );

      return () => clearTimeout(geoTimeout);
    } else {
      setCurrentLocation({ lat, lng });
    }
  }, [lat, lng]);
  // Initialize map
  useEffect(() => {
    if (!currentLocation || !mapRef.current) return;

    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
      version: "weekly",
    });

    let currentMap: google.maps.Map;
    let currentMarker: google.maps.Marker;

    loader.load().then(() => {
      currentMap = new google.maps.Map(mapRef.current!, {
        center: currentLocation,
        zoom: 14,
      });

      currentMarker = new google.maps.Marker({
        position: currentLocation,
        map: currentMap,
        title: "Selected Location",
      });

      setMap(currentMap);
      setMarker(currentMarker);
    });

    return () => {
      if (currentMap) currentMap.unbindAll();
      if (currentMarker) currentMarker.setMap(null);
    };
  }, [currentLocation]);

  // Update marker position when coordinates change
  useEffect(() => {
    if (map && marker && currentLocation) {
      map.panTo(currentLocation);
      marker.setPosition(currentLocation);
    }
  }, [currentLocation, map, marker]);

  return (
    <div className="w-full h-full">
      {mapError ? (
        <div className="text-red-500 p-4">{mapError}</div>
      ) : (
        <div ref={mapRef} className="w-full h-[400px] rounded-lg shadow-lg" />
      )}
    </div>
  );
};

export default LocationMap;
