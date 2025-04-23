"use client";
import Image from "next/image";
import React, { useState } from "react";

interface CardImageProps {
  imageUrl: string | null | undefined; // Allow undefined
  altText: string;
  width?: string;
  height?: string;
  aspectRatio?: "square" | "landscape" | "portrait";
  fallbackSrc?: string;
  placeholderText?: string;
  priority?: boolean; // Add a priority prop to control prioritization
  className?: string; // Allow custom classes
  style?: React.CSSProperties; // Allow custom styles
}

const CardImage: React.FC<CardImageProps> = ({
  imageUrl,
  altText,
  width = "100%",
  height = "auto",
  aspectRatio = "square",
  fallbackSrc = "/default-logo.png", // Ensure this is a valid local path
  placeholderText = "No Image Available",
  priority = false, // Default to false unless specified
  className = "", // Default to empty string
  style = {}, // Default to empty object
}) => {
  const [isLoading, setIsLoading] = useState(true); // State to track image loading
  const [hasError, setHasError] = useState(false); // State to track image errors

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case "square":
        return "aspect-square";
      case "landscape":
        return "aspect-video"; // 16:9
      case "portrait":
        return "aspect-[3/4]"; // 3:4
      default:
        return "aspect-square";
    }
  };

  return (
    <div
      className={`relative w-full h-full ${getAspectRatioClass()} overflow-hidden rounded-md shadow-sm ${className}`}
      style={{ width, height, ...style }}
    >
      {/* Enhanced Skeleton Loader with Text Placeholder */}
      {(isLoading || hasError) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-200 p-4">
          {/* Image Skeleton */}
          <div
            className={`w-full h-full bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-gradient ${
              aspectRatio === "landscape" ? "rounded-lg" : "rounded-md"
            }`}
            style={{
              backgroundSize: "200% 100%",
              animation: "gradient 1.5s ease-in-out infinite",
            }}
          ></div>

          {/* Text Placeholder */}
          <div className="w-full mt-4 space-y-2">
            <div className="h-4 bg-gray-300 rounded-md animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded-md animate-pulse w-3/4"></div>
          </div>
        </div>
      )}

      {/* Image with Gradual Reveal */}
      {imageUrl && !hasError && (
        <div className="relative w-full h-full">
          <Image
            src={imageUrl || fallbackSrc}
            alt={altText}
            width={300}
            height={300}
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 300px"
            priority={priority}
            className={className}
            style={style}
            onLoad={() => setIsLoading(false)}
            onError={() => setHasError(true)}
            unoptimized={!!imageUrl && imageUrl.startsWith('data:')}
            placeholder={priority ? 'blur' : undefined}
            blurDataURL={priority ? '/default-logo.png' : undefined}
          />
          {/* Overlay for Gradual Reveal */}
          {isLoading && (
            <div
              className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-gradient"
              style={{
                backgroundSize: "200% 100%",
                animation: "gradient 1.5s ease-in-out infinite",
              }}
            ></div>
          )}
        </div>
      )}

      {/* Fallback Content */}
      {!imageUrl && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          <span className="text-sm text-gray-500">{placeholderText}</span>
        </div>
      )}
    </div>
  );
};

export default CardImage;
