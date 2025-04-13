"use client"; // Mark as client component
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Promotion } from "../../../../types/offerType";

export default function ClientOfferCard({
  promotion,
}: {
  promotion: Promotion;
}) {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const handleSelectOffer = () => {
    setIsConfirmationOpen(true); // Open confirmation dialog
  };

  const handleConfirmOffer = () => {
    setIsConfirmationOpen(false); // Close the dialog
  };

  return (
    <>
      <Card
        className="shadow-md rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300"
        onClick={handleSelectOffer}
      >
        <CardContent className="p-6">
          <div className="h-full flex items-center justify-center relative">
            {/* Image background */}
            <img
              src={promotion.imageUrl || ""}
              alt={promotion.title}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy" // Lazy load images for better performance
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
            {/* Content Box */}
            <Card className="relative w-full max-w-2xl mx-4 md:mx-auto text-center p-6 md:p-8 rounded-lg shadow-xl bg-white/10 backdrop-blur-sm z-10 border border-white/20">
              <CardHeader>
                <CardTitle className="text-4xl md:text-5xl font-bold text-primary mb-4">
                  {promotion.title}
                </CardTitle>
                <CardDescription className="text-lg md:text-xl text-gray-200 mb-6">
                  {promotion.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full md:w-auto bg-primary hover:bg-primary-dark text-white px-8 py-4 text-lg md:text-xl font-semibold rounded-lg transition duration-300">
                  اضف للسلة
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
    </>
  );
}
