import React from 'react';
import { getSliderImages } from './actions/getSliderImages';
import AddOfferForm from './components/AddOffer';
import SliderImagesGallery from './components/SliderImagesGallery';

async function page() {
  // Fetch slider images from the backend
  const sliderImages = await getSliderImages();

  return (
    <>
      <AddOfferForm />
      <SliderImagesGallery images={sliderImages} />
    </>
  );
}

export default page;
