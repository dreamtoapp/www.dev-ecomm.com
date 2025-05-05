"use server";

import db from '@/lib/prisma';

/**
 * Fetch related products from the same supplier
 */
export async function getRelatedProducts(supplierId: string, excludeId: string, limit: number = 4) {
  try {
    if (!supplierId) {
      return [];
    }

    // Find related products from the same supplier
    const products = await db.product.findMany({
      where: {
        supplierId: supplierId,
        id: {
          not: excludeId || undefined,
        },
        outOfStock: false,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        price: true,
        imageUrl: true,
        rating: true,
        reviewCount: true,
        outOfStock: true,
      },
      take: limit,
      orderBy: {
        rating: "desc",
      },
    });

    // Map outOfStock to inStock for consistency with the interface
    return products.map(product => ({
      ...product,
      inStock: !product.outOfStock,
      imageUrl: product.imageUrl || "/fallback/product-fallback.avif",
    }));
  } catch (error) {
    console.error("Error fetching related products:", error);
    return [];
  }
}
