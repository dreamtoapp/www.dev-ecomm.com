import { useState, useEffect } from "react";
import { fetchAddressFromCoordinates } from "../actions/actions";
import { toast } from "sonner";

export function useAddressSelection({
  coordinates,
}: {
  coordinates: { lat: number | null; lng: number | null };
}) {
  const [manualAddress, setManualAddress] = useState("");
  const [error, setError] = useState("");
  const [currentLocationAddress, setCurrentLocationAddress] = useState<
    string | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch address from coordinates
  const fetchAddress = async () => {
    if (coordinates.lat && coordinates.lng) {
      setIsLoading(true);
      try {
        const result = await fetchAddressFromCoordinates(
          coordinates.lat,
          coordinates.lng
        );
        if (result.success) {
          setCurrentLocationAddress(result.address);
        } else {
          toast.error(result.error); // Show error notification
          setCurrentLocationAddress(null); // Reset address on error
        }
      } catch (error) {
        console.error("Error fetching address:", error);
        toast.error("فشل في جلب العنوان. يرجى المحاولة مرة أخرى."); // Show error notification
        setCurrentLocationAddress(null); // Reset address on error
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Fetch address when coordinates change
  useEffect(() => {
    fetchAddress();
  }, [coordinates]);

  // Handle manual address submission
  const handleManualAddressSubmit = () => {
    if (!manualAddress.trim()) {
      setError("يرجى إدخال عنوان صحيح.");
      return;
    }
    setError("");
    return manualAddress;
  };

  return {
    manualAddress,
    setManualAddress,
    error,
    setError,
    currentLocationAddress,
    isLoading,
    fetchAddress,
    handleManualAddressSubmit,
  };
}
