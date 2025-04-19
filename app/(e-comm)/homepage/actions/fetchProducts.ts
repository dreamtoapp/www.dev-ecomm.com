"use server";

import { cacheData } from '@/lib/cache';
import db from '@/lib/prisma';

async function fetchProductsFromDB(sulg?: string) {
  // if (!sulg || typeof sulg !== "string" || sulg.trim() === "") {
  //   return []; // Return an empty array if the slug is invalid
  // }

  const supplier = await db.supplier.findFirst({
    where: { slug: sulg },
    select: { id: true }
  });

  const products = await db.product.findMany({
    where: {
      published: true,
      supplierId: supplier?.id, // Filter by supplierId if sid is provided
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



