import { headers } from 'next/headers';

import SimpleCarousel from './SimpleCarousel';

interface CarouselImage {
  id: string;
  url: string;
  alt: string;
}

interface ServerCarouselProps {
  images: CarouselImage[];
  className?: string;
}

export default async function ServerCarousel({
  images,
  className
}: ServerCarouselProps) {
  // Get the user agent from the request headers - using async/await as per Next.js 15 best practices
  let deviceType = 'desktop'; // Default to desktop

  try {
    // In Next.js 15, headers() is an async function that should be awaited
    const headersList = await headers();
    const userAgent = headersList.get('user-agent') || '';

    // Determine device type based on user agent
    if (userAgent.match(/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i)) {
      deviceType = 'mobile';
    } else if (userAgent.match(/iPad|tablet|Tablet|TabletPC/i)) {
      deviceType = 'tablet';
    }
  } catch (error) {
    console.error('Error accessing headers:', error);
    // Fall back to desktop if there's an error
  }

  return (
    <SimpleCarousel
      images={images}
      deviceType={deviceType}
      className={className}
    />
  );
}
