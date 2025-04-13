"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import Image from "next/image";

interface Offer {
  id: string;
  title: string;
  imageUrl: string | null;
}

interface OfferSliderProps {
  offers: Offer[];
}

const OfferSlider: React.FC<OfferSliderProps> = ({ offers }) => {
  return (
    <Swiper
      modules={[Autoplay, Pagination, EffectCoverflow]}
      effect="coverflow"
      grabCursor={true}
      centeredSlides={true}
      coverflowEffect={{
        rotate: 15,
        stretch: 0,
        depth: 300,
        modifier: 1,
        slideShadows: false,
      }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      // pagination={{
      //   clickable: true,
      //   bulletClass: "swiper-pagination-bullet bg-gray-400 hover:bg-gray-600",
      //   bulletActiveClass: "swiper-pagination-bullet-active !bg-primary",
      // }}
      loop={true}
      speed={1000}
      slidesPerView={1}
      spaceBetween={30}
      breakpoints={{
        640: {
          slidesPerView: 1.5,
          coverflowEffect: {
            rotate: 10,
            depth: 200,
          },
        },
        768: {
          slidesPerView: 3,
          coverflowEffect: {
            rotate: 0,
            stretch: -30,
            depth: 100,
            modifier: 2.5,
          },
        },
      }}
      className="w-full h-full pb-16"
    >
      {offers.map((offer) => (
        <SwiperSlide key={offer.id} className="!h-auto !flex items-center">
          <div className="relative w-full max-w-[720px] aspect-[720/550] mx-auto rounded-xl overflow-hidden group transform transition-transform duration-300 hover:scale-105 shadow-xl">
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={offer.imageUrl || "/fallback-image.jpg"}
                alt={offer.title}
                fill
                className="object-cover object-center"
                priority
                sizes="(max-width: 768px) 90vw, 720px"
                quality={90}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-6">
              <h3 className="text-white text-xl font-bold">{offer.title}</h3>
            </div>
          </div>
        </SwiperSlide>
      ))}

      <style jsx global>{`
        .swiper-pagination {
          bottom: 30px !important;
        }
        .swiper-slide {
          transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .swiper-slide-active {
          transform: translate3d(0, 0, 0) scale(1) !important;
          z-index: 1;
        }
        .swiper-slide-next,
        .swiper-slide-prev {
          transform: translate3d(0, 0, -100px) rotateX(20deg) scale(0.9) !important;
          opacity: 0.7;
        }
        @media (max-width: 768px) {
          .swiper-slide-next,
          .swiper-slide-prev {
            transform: translate3d(0, 0, -50px) rotateX(30deg) scale(0.85) !important;
          }
        }
      `}</style>
    </Swiper>
  );
};

const OfferSection: React.FC<OfferSliderProps> = ({ offers }) => {
  return (
    <section className="relative py-12 px-4 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto">
        <OfferSlider offers={offers} />
      </div>
    </section>
  );
};

export default OfferSection;