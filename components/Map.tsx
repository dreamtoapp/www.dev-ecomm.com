"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { MapIcon, MapPin, MapPinX } from "lucide-react";

interface MapProps {
  latitude?: number | null;
  longitude?: number | null;
  zoom?: number;
}

const Map = ({ latitude, longitude, zoom = 15 }: MapProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Check if valid coordinates are provided
  const isLatitudeValid = latitude !== undefined && latitude !== null && latitude >= -90 && latitude <= 90;
  const isLongitudeValid = longitude !== undefined && longitude !== null && longitude >= -180 && longitude <= 180;
  const hasValidCoordinates = isLatitudeValid && isLongitudeValid;

  // Construct the map URL if valid coordinates exist
  const mapUrl = hasValidCoordinates
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${longitude! - 0.01
    },${latitude! - 0.01},${longitude! + 0.01},${latitude! + 0.01
    }&layer=mapnik&marker=${latitude},${longitude}`
    : "";

  return (
    <div>
      {/* Button to Open Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button disabled={!hasValidCoordinates} variant="outline" className="flex items-center gap-2">
            {hasValidCoordinates ? <MapIcon /> : <MapPinX />}
          </Button>
        </DialogTrigger>

        {/* Dialog Content */}
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>عرض الموقع</DialogTitle>
            {/* <DialogDescription>
              {hasValidCoordinates
                ? "Below is the map for the provided coordinates:"
                : "The provided coordinates are invalid. Please check the latitude and longitude values."}
            </DialogDescription> */}
          </DialogHeader>

          {/* Map Display */}
          {hasValidCoordinates ? (
            <div className="w-full h-[400px] rounded-lg shadow-md overflow-hidden">
              <iframe
                title="Location Map"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                src={mapUrl}
                style={{ border: 0 }}
                allowFullScreen
              />
            </div>
          ) : (
            <div className="text-center text-red-500 font-medium">
              Unable to display the map due to invalid coordinates.
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Map;
