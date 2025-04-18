"use client";
import 'swiper/css'; // Import core Swiper CSS
import 'swiper/css/autoplay'; // Import Autoplay module CSS
import 'swiper/css/effect-fade'; // Import EffectFade module CSS

import React from 'react';

import Image from 'next/image';
import {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from 'swiper/modules'; // Import necessary modules
import {
  Swiper,
  SwiperSlide,
} from 'swiper/react';

interface Offer {
  id: string;
  title: string;
  imageUrl: string | null;
}

interface OfferSliderProps {
  offers: Offer[];
}

const OfferSlider: React.FC<OfferSliderProps> = ({ offers }) => {
  console.log("Debug: Offers passed to OfferSlider:", offers);
  return (
    <div className="relative w-full max-w-[720px] mx-auto">
      {/* Reserve space for the slider to prevent layout shift */}
      <div className="relative w-full h-0" style={{ paddingBottom: "76.39%" }}>
        <Swiper
          modules={[Autoplay, EffectFade, Navigation, Pagination]} // Added Navigation and Pagination modules
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          effect="fade" // Use fade effect for smooth transitions
          fadeEffect={{ crossFade: true }}
          navigation // Enable navigation buttons
          pagination={{ clickable: true }} // Enable clickable pagination
          loop={true}
          speed={800} // Smooth transition speed
          slidesPerView={1}
          className="absolute inset-0 w-full h-full"
        >
          {offers.map((offer) => (
            // Move the debug statement outside of JSX
            console.log("Debug: Rendering SwiperSlide with imageUrl:", offer.imageUrl),
            <SwiperSlide key={offer.id}>
              <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg">
                {/* Ensure the image URL is valid */}
                {offer.imageUrl ? (
                  <Image
                    src={offer.imageUrl}
                    alt={offer.title}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 90vw, 720px"
                    quality={85} // Reduced quality for better performance
                    priority // Add priority for better LCP (Largest Contentful Paint)
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-gray-200">
                    <span className="text-gray-500">No Image Available</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-4">
                  <h3 className="text-white text-lg font-semibold">
                    {offer.title}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

const OfferSection: React.FC<OfferSliderProps> = ({ offers }) => {
  return (
    <section className="relative py-8 px-4 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto">
        <OfferSlider offers={offers} />
      </div>
    </section>
  );
};

export default OfferSection;