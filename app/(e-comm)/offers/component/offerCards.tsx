"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules"; // Removed Navigation
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Offer {
  id: string;
  title: string;
  description: string;
  link?: string;
  imageUrl: string;
}

const ShowAllOffer = ({ id, title, description, link, imageUrl }: Offer) => {
  return (
    <div className="h-full flex items-center justify-center relative">
      {/* Image background */}
      <img
        src={imageUrl}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy" // Lazy load images for better performance
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
      {/* Content Box */}
      <Card className="relative w-full max-w-2xl mx-4 md:mx-auto text-center p-6 md:p-8 rounded-lg shadow-xl bg-white/10 backdrop-blur-sm z-10 border border-white/20">
        <CardHeader>
          <CardTitle className="text-4xl md:text-5xl font-bold text-primary mb-4">
            {title}
          </CardTitle>
          <CardDescription className="text-lg md:text-xl text-gray-200 mb-6">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full md:w-auto bg-primary hover:bg-primary-dark text-white px-8 py-4 text-lg md:text-xl font-semibold rounded-lg transition duration-300">
            اطلب الان
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShowAllOffer;
