export interface Product {
  id: string;
  name: string;
  slug: string; // Add slug field for SEO-friendly URLs
  price: number;
  details: string | null;
  size: string | null;
  published: boolean;
  outOfStock: boolean;
  imageUrl: string; // We'll ensure this is always a string in our data processing
  images?: string[]; // Array of image URLs for multiple product images
  type: string;

  // Rating and review properties
  rating?: number | null;
  reviewCount?: number | null;

  // Additional properties that might be included from the database
  supplier?: any;
  supplierId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
