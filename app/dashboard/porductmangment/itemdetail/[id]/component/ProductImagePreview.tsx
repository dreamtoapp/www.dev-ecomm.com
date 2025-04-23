import React, { useState } from "react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductImagePreviewProps {
  src: string;
  alt: string;
  fallbackSrc: string;
}

// Renders the product image with a loading skeleton and aspect ratio
const ProductImagePreview: React.FC<ProductImagePreviewProps> = ({ src, alt, fallbackSrc }) => {
  const [imageLoading, setImageLoading] = useState(true);
  console.log({src, alt, fallbackSrc})
  return (
    <div className="relative rounded-xl overflow-hidden border border-border bg-card shadow-sm min-w-[200px] min-h-[120px] md:min-w-[320px] md:min-h-[180px] flex items-center justify-center">
      <AspectRatio ratio={16 / 9}>
        <Image
          src={src || fallbackSrc}
          alt={alt}
          fill
          className="object-cover w-full h-full bg-background"
          onLoad={() => setImageLoading(false)}
          sizes="(max-width: 640px) 90vw, (max-width: 1200px) 33vw, 25vw"
          priority={false}
        />
        {imageLoading && (
          <Skeleton className="absolute inset-0 h-full w-full z-10 bg-muted/60" />
        )}
      </AspectRatio>
    </div>
  );
};

export default ProductImagePreview;
