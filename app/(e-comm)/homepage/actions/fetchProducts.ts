// app/(e-comm)/actions/fetchProducts.ts
"use server";

import { cacheData } from '@/lib/cache';
import db from '@/lib/prisma';

// Helper function to fetch products
async function fetchProductsFromDB(sid?: string) {
  const products = await db.product.findMany({
    where: {
      published: true,
      supplierId: sid ? sid : undefined, // Filter by supplierId if sid is provided
    },
    include: { supplier: true },
  });

  return products.map((product) => ({
    ...product,
    imageUrl: product.imageUrl || "https://via.placeholder.com/150", // Default image if null
  }));
}

export const fetchProducts = cacheData(
  fetchProductsFromDB,
  ["fetchProducts"], // Cache key
  { revalidate: 3600 } // Revalidate every 60 seconds
);



