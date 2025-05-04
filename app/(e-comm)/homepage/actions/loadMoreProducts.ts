"use server"

import db from '@/lib/prisma';
import { Product } from '@/types/product';

// Simple server action to load more products
export async function loadMoreProducts(slug: string, page: number): Promise<Product[]> {
  // Calculate how many to skip based on page number
  const skip = page * 8;
  
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
    
    // Fetch next page of products
    const products = await db.product.findMany({
      where: whereClause,
      skip,
      take: 8,
      include: { supplier: true },
      orderBy: { createdAt: 'desc' }
    });
    
    // Add default image if needed
    return products.map(product => ({
      ...product,
      imageUrl: product.imageUrl || "/fallback/fallback.avif"
    }));
  } catch (error) {
    console.error('Error loading more products:', error);
    return [];
  }
}
