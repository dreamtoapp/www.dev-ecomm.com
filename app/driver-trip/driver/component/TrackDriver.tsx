"use client";

import { useEffect, useState } from "react";
import { updateDriverLocation } from "../action/trackDriver";

interface DriverTrackerProps {
  driverId: string;
  orderId: string;
  intervalMinutes?: number; // New prop for parent control
}

const DriverTracker = ({
  driverId,
  orderId,
  intervalMinutes = 15, // Default to 10 minutes if not provided
}: DriverTrackerProps) => {
  // Convert minutes to seconds for the timer
  const initialTimeLeft = intervalMinutes * 60;
  const [timeLeft, setTimeLeft] = useState(initialTimeLeft);
  const [isUpdating, setIsUpdating] = useState(false);

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : initialTimeLeft));
    }, 1000);

    return () => clearInterval(timer);
  }, [initialTimeLeft]); // React to intervalMinutes changes

  // Location update effect
  useEffect(() => {
    const getLocationAndUpdate = async () => {
      setIsUpdating(true);
      try {
        const position = await new Promise<GeolocationPosition>(
          (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          }
        );

        await updateDriverLocation({
          driverId,
          orderId,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        setTimeLeft(initialTimeLeft); // Reset to initial time
      } catch (error) {
        console.error("Error updating location:", error);
      } finally {
        setIsUpdating(false);
      }
    };

    // Initial update
    getLocationAndUpdate();

    // Set up interval for updates using parent's duration
    const interval = setInterval(
      getLocationAndUpdate,
      intervalMinutes * 60 * 1000
    );

    return () => clearInterval(interval);
  }, [driverId, orderId, initialTimeLeft]); // Include initialTimeLeft in dependencies

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="p-1 bg-gray-100 rounded-lg text-gray-600">
      <div className="flex items-center gap-4">
        <p className="text-sm text-gray-600">
          Next update in: {formatTime(timeLeft)}
        </p>

        <div className="flex items-center gap-2">
          {isUpdating && (
            <span className="text-sm text-blue-600">Updating...</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DriverTracker;
