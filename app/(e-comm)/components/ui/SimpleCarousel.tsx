"use client";

import 'react-multi-carousel/lib/styles.css';

import React from 'react';

import Carousel from 'react-multi-carousel';

// Define responsive breakpoints
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

interface CarouselImage {
  id: string;
  url: string;
  alt: string;
}

interface SimpleCarouselProps {
  images: CarouselImage[];
  deviceType?: string;
  className?: string;
}

export default function SimpleCarousel({
  images,
  deviceType,
  className = ''
}: SimpleCarouselProps) {
  // If no images, show a placeholder
  if (!images || images.length === 0) {
    return (
      <div className={`w-full ${className}`}>
        <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">No images available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      <Carousel
        ssr
        deviceType={deviceType}
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        customTransition="transform 500ms ease-in-out"
        transitionDuration={500}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item"
        removeArrowOnDeviceType={["tablet", "mobile"]}
      >
        {images.map((image) => (
          <div key={image.id} className="carousel-item-container">
            <img
              src={image.url}
              alt={image.alt || 'Promotional offer'}
              className="carousel-image"
              onError={(e) => {
                // Fallback to a local placeholder image if the original image fails to load
                const imgElement = e.currentTarget as HTMLImageElement;
                imgElement.src = "/fallback/fallback.avif";
              }}
            />
            <div className="carousel-caption">
              <h3>{image.alt || 'Promotional offer'}</h3>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
