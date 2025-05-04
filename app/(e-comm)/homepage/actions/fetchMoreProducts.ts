"use server"

import db from '@/lib/prisma';
import { Product } from '@/types/product';

/**
 * Server action to fetch additional products for infinite scrolling
 * This is called from the client component when more products need to be loaded
 */
export async function fetchMoreProducts(slug: string, page: number): Promise<Product[]> {
  const pageSize = 8;
  const skip = page * pageSize;

  try {
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

    // Fetch paginated products with a smaller page size to avoid cache issues
    const products = await db.product.findMany({
      where: whereClause,
      skip,
      take: pageSize,
      select: {
        id: true,
        name: true,
        price: true,
        details: true,
        size: true,
        published: true,
        outOfStock: true,
        imageUrl: true,
        supplier: {
          select: {
            id: true,
            name: true,
            type: true
          }
        }
      },
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
        // Add required type field
        type: 'product',
      };

      return processedProduct;
    });
  } catch (error) {
    console.error('Error fetching more products:', error);
    return [];
  }
}
