import React from 'react';

import ServerCarousel from '../../../components/ui/ServerCarousel';

interface Offer {
  id: string;
  title: string;
  imageUrl: string | null;
}

interface OfferSliderProps {
  offers: Offer[];
}

const SliderSection: React.FC<OfferSliderProps> = ({ offers }) => {
  // Transform offers to the format expected by ServerCarousel
  const carouselImages = offers.map(offer => ({
    id: offer.id,
    url: offer.imageUrl || '/fallback/fallback.avif',
    alt: offer.title
  }));

  console.log("SliderSection - Carousel Images:", carouselImages);

  // If no offers, don't render the section
  if (!offers || offers.length === 0) {
    return null;
  }

  return (
    <section className="relative py-8 px-4 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto max-w-full">
        <ServerCarousel
          images={carouselImages}
          className="rounded-xl overflow-hidden shadow-lg"
        />
      </div>
    </section>
  );
};

export default SliderSection;