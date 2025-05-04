"use client";

import { useState } from 'react';

interface SimpleProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function SimpleProductImage({
  src,
  alt,
  className = '',
}: SimpleProductImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && !hasError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
      )}

      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          <span className="text-sm text-gray-500">No Image</span>
        </div>
      )}

      <img
        src={imgSrc}
        alt={alt}
        className={`w-full h-full object-cover ${isLoading ? 'opacity-0' : 'opacity-100'} ${hasError ? 'hidden' : ''}`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          if (imgSrc !== "/fallback/product-fallback.avif") {
            setImgSrc("/fallback/product-fallback.avif");
          } else {
            setHasError(true);
          }
        }}
      />
    </div>
  );
}
