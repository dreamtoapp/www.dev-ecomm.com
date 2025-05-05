"use server";

import { cacheData } from '@/lib/cache';
import db from '@/lib/prisma';
import { Product } from '@/types/product';

async function fetchPaginatedProductsFromDB(
  page: number = 1,
  limit: number = 20,
  slug: string = ""
): Promise<Product[]> {
  // Calculate skip value for pagination
  const skip = (page - 1) * limit;

  // Find supplier if slug is provided
  let whereClause: any = { published: true };

  if (slug && slug.trim() !== "") {
    const supplier = await db.supplier.findFirst({
      where: { slug },
      select: { id: true }
    });

    if (supplier) {
      whereClause.supplierId = supplier.id;
    }
  }

  // Fetch paginated products
  const products = await db.product.findMany({
    where: whereClause,
    skip,
    take: limit,
    include: { supplier: true },
    orderBy: { createdAt: 'desc' }
  });

  // Add default image if needed, ensure price is a valid number
  return products.map((product) => {
    // Always provide a valid string for imageUrl
    const fallbackImage = "/fallback/fallback.avif";

    // Check if the image URL exists and is valid
    const hasValidImageUrl = product.imageUrl && typeof product.imageUrl === 'string' &&
      (product.imageUrl.startsWith('/') || // Local images
        product.imageUrl.startsWith('http')); // Remote images

    // Create a product object that matches the Product type
    const processedProduct: Product = {
      ...product,
      // Always return a string for imageUrl
      imageUrl: hasValidImageUrl ? product.imageUrl as string : fallbackImage,
      // Ensure price is a valid number
      price: typeof product.price === 'number' && !isNaN(product.price) ? product.price : 0,
      // Ensure slug is available
      slug: product.slug || product.id,
      // Ensure images array is available
      images: product.images || [hasValidImageUrl ? product.imageUrl as string : fallbackImage],
    };

    return processedProduct;
  });
}

// Cache the paginated products with a unique key based on page, limit, and slug
export const fetchPaginatedProducts = cacheData(
  fetchPaginatedProductsFromDB,
  ["fetchPaginatedProducts"],
  { revalidate: 3600 } // Revalidate every hour
);
