"use client";

import { useState } from 'react';

import {
  ChevronLeft,
  ChevronRight,
  Expand,
  X,
} from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from '../ui/dialog';

interface ProductImageGalleryProps {
  mainImage: string;
  additionalImages?: string[];
}

export default function ProductImageGallery({
  mainImage,
  additionalImages = []
}: ProductImageGalleryProps) {
  const allImages = [mainImage, ...additionalImages].filter(Boolean);
  const [currentImage, setCurrentImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handlePrevious = () => {
    setCurrentImage((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImage((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
        <div
          className="w-full h-full cursor-pointer"
          onClick={() => setIsFullscreen(true)}
        >
          <Image
            src={allImages[currentImage]}
            alt="صورة المنتج"
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        {allImages.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-background/80 shadow-sm"
              onClick={handlePrevious}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">السابق</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-background/80 shadow-sm"
              onClick={handleNext}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">التالي</span>
            </Button>
          </>
        )}

        <Button
          variant="ghost"
          size="icon"
          className="absolute bottom-2 right-2 h-8 w-8 rounded-full bg-background/80 shadow-sm"
          onClick={() => setIsFullscreen(true)}
        >
          <Expand className="h-4 w-4" />
          <span className="sr-only">تكبير</span>
        </Button>
      </div>

      {allImages.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {allImages.map((image, index) => (
            <button
              key={index}
              className={cn(
                "relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-muted",
                currentImage === index && "ring-2 ring-primary ring-offset-2"
              )}
              onClick={() => setCurrentImage(index)}
            >
              <Image
                src={image}
                alt={`صورة المنتج ${index + 1}`}
                fill
                className="object-cover object-center"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Image Dialog */}
      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogContent className="max-w-screen-lg p-0 bg-black/95 border-none">
          <DialogTitle className='hidden'>صورة المنتج</DialogTitle>
          <div className="relative h-[90vh] w-full">
            <Image
              src={allImages[currentImage]}
              alt="صورة المنتج"
              fill
              className="object-contain"
            />

            {allImages.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/20 text-white hover:bg-white/30"
                  onClick={handlePrevious}
                >
                  <ChevronLeft className="h-6 w-6" />
                  <span className="sr-only">السابق</span>
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/20 text-white hover:bg-white/30"
                  onClick={handleNext}
                >
                  <ChevronRight className="h-6 w-6" />
                  <span className="sr-only">التالي</span>
                </Button>
              </>
            )}

            <DialogClose className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/20 text-white hover:bg-white/30 flex items-center justify-center">
              <X className="h-4 w-4" />
              <span className="sr-only">إغلاق</span>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
