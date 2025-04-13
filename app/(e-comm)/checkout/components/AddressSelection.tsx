"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAddressSelection } from "../hooks/useAddressSelection";

/**
 * AddressSelection Component
 * This component provides a dialog for users to select or input a delivery address.
 * It supports selecting a saved address, using the current location, or entering a manual address.
 */
export default function AddressSelection({
  showAddressDialog, // Controls whether the dialog is visible
  setShowAddressDialog, // Function to toggle the dialog visibility
  savedAddress, // Pre-saved address (if available)
  coordinates, // Current location coordinates (latitude and longitude)
  handleSelectAddress, // Callback to handle address selection
}: {
  showAddressDialog: boolean;
  setShowAddressDialog: (value: boolean) => void;
  savedAddress: string | null;
  coordinates: { lat: number | null; lng: number | null };
  handleSelectAddress: (address: string) => void;
}) {
  /**
   * Custom Hook: useAddressSelection
   * Handles logic for fetching the address from coordinates and managing manual address input.
   */
  const {
    manualAddress, // State for manually entered address
    setManualAddress, // Function to update manual address
    error, // Error message for manual address input
    currentLocationAddress, // Address fetched from coordinates
    isLoading, // Loading state for address fetching
    fetchAddress, // Function to fetch address from coordinates
    handleManualAddressSubmit, // Function to validate and submit manual address
  } = useAddressSelection({ coordinates });

  return (
    <Dialog open={showAddressDialog} onOpenChange={setShowAddressDialog}>
      {/* Dialog Content */}
      <DialogContent className="sm:max-w-[425px] p-6 w-full">
        {/* Dialog Header */}
        <DialogHeader>
          <DialogTitle className="text-center">
            اختيار عنوان التوصيل
          </DialogTitle>
        </DialogHeader>

        {/* Saved Address Button */}
        {savedAddress && (
          <Button
            variant="outline"
            onClick={() => handleSelectAddress(savedAddress)}
            className="w-full mb-4 text-sm" // Adjust font size and spacing
          >
            استخدم العنوان المسجل: {savedAddress}
          </Button>
        )}

        {/* Current Location Section */}
        {coordinates.lat && coordinates.lng && (
          <div className="space-y-2">
            {/* Button to Use Current Location */}
            <p>العنوان الحالي</p>
            <Button
              variant="destructive"
              className="h-14 p-4"
              onClick={() =>
                handleSelectAddress(
                  currentLocationAddress ||
                    `خط العرض: ${coordinates.lat}, خط الطول: ${coordinates.lng}`
                )
              }
              // className="w-full text-sm p-2" // Adjust font size
              disabled={isLoading} // Disable while loading
            >
              <p className="text-wrap ">
                {isLoading
                  ? "جاري تحميل العنوان..." // Show loading state
                  : currentLocationAddress
                  ? `   ${currentLocationAddress}` // Show fetched address
                  : "  "}{" "}
              </p>
              {/* Default fallback */}
            </Button>

            {/* Retry Button for Fetching Address */}
            {!isLoading && !currentLocationAddress && (
              <Button
                variant="link"
                onClick={fetchAddress}
                className="w-full text-primary hover:underline text-sm" // Adjust font size
              >
                حاول مرة أخرى
              </Button>
            )}
          </div>
        )}

        {/* Manual Address Input Section */}
        <div className="mt-4 space-y-2">
          {/* Label for Manual Address Input */}
          <Label
            htmlFor="manual-address"
            className="block text-sm text-foreground"
          >
            أدخل عنوانًا يدويًا
          </Label>

          {/* Input Field for Manual Address */}
          <Input
            id="manual-address"
            type="text"
            value={manualAddress}
            onChange={(e) => {
              setManualAddress(e.target.value); // Update manual address state
            }}
            placeholder="أدخل العنوان هنا"
            className="w-full text-sm" // Adjust font size
            aria-invalid={!!error} // Indicate invalid input if there's an error
          />

          {/* Error Message for Manual Address Input */}
          {error && (
            <p className="text-sm text-destructive mt-1" role="alert">
              {error}
            </p>
          )}
        </div>

        {/* Submit Button for Manual Address */}
        <Button
          onClick={() => {
            const address = handleManualAddressSubmit(); // Validate and get manual address
            if (address) {
              handleSelectAddress(address); // Pass the address to the parent component
            }
          }}
          className="w-full mt-4 text-sm" // Adjust font size
          disabled={!manualAddress.trim()} // Disable if the input is empty
        >
          استخدام هذا العنوان
        </Button>
      </DialogContent>
    </Dialog>
  );
}
