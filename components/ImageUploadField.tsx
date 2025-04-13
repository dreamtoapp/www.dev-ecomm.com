"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react"; // Added useEffect

interface ImageUploadFieldProps {
  label: string;
  onFileSelect: (file: File | null) => void; // Callback to notify the parent of file changes
  error?: string; // Optional error message for validation feedback
  width?: number; // Optional width for the preview container (default: 150)
  height?: number; // Optional height for the preview container (default: 150)
  previewUrl?: string | null; // Optional preview URL for initial image display
}

export default function ImageUploadField({
  label,
  onFileSelect,
  error,
  width = 150, // Default width
  height = 150, // Default height
  previewUrl: initialPreviewUrl = null, // Optional initial preview URL
}: ImageUploadFieldProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialPreviewUrl
  ); // Internal state for preview URL
  const [isLoading, setIsLoading] = useState(false); // Loading state for image processing
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update the preview URL if the initialPreviewUrl prop changes
  useEffect(() => {
    setPreviewUrl(initialPreviewUrl);
  }, [initialPreviewUrl]);

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      setIsLoading(true); // Start loading
      const url = URL.createObjectURL(file); // Create a preview URL
      setPreviewUrl(url);
      onFileSelect(file); // Notify the parent of the selected file

      // Simulate image loading delay (optional)
      setTimeout(() => {
        setIsLoading(false); // Stop loading after image is ready
      }, 1000);
    } else {
      setPreviewUrl(null);
      onFileSelect(null); // Notify the parent that no file is selected
    }
  };

  // Trigger file input when preview is clicked
  const handlePreviewClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Clear the selected image
  const handleClear = () => {
    setPreviewUrl(null);
    onFileSelect(null); // Notify the parent that the file has been cleared
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the file input
    }
  };

  return (
    <div className="space-y-4">
      {/* Label */}
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {/* Hidden File Input */}
      <Input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden" // Hide the file input visually
      />

      {/* Image Preview Container */}
      <div
        className="relative flex justify-center items-center bg-gray-100 rounded-lg overflow-hidden border border-gray-300 cursor-pointer"
        style={{ width: `${width}px`, height: `${height}px` }}
        onClick={handlePreviewClick} // Make the preview clickable
      >
        {previewUrl ? (
          <>
            {/* Image with Skeleton Loader */}
            <div className="relative w-full h-full">
              <Image
                src={previewUrl}
                alt="Preview"
                fill // Automatically fills the parent container
                sizes="(max-width: 768px) 100vw, 50vw" // Responsive sizing for performance
                loading="lazy" // Lazy load the image
                className="object-cover rounded-lg transition-transform duration-300 hover:scale-105" // Smooth hover effect
                onLoad={() => setIsLoading(false)} // Stop loading when image is ready
              />
              {/* Loading Spinner */}
              {isLoading && (
                <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
                </div>
              )}
            </div>

            {/* Clear Button */}
            <button
              className="absolute top-2 right-2 bg-white bg-opacity-80 text-red-500 p-1 rounded-full shadow-md hover:bg-opacity-100 transition-all"
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the preview click
                handleClear();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </>
        ) : // Skeleton Loader or Upload Prompt
        isLoading ? (
          <div className="animate-pulse bg-gray-200 w-full h-full rounded-lg"></div>
        ) : (
          <div className="text-gray-500 text-sm">Click to Upload</div>
        )}
      </div>

      {/* Error Message */}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
