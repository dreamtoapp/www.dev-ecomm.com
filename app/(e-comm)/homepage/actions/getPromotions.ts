"use server"
import { cacheData } from '@/lib/cache';
import db from '@/lib/prisma';

// Helper function to fetch promotions
async function fetchPromotions() {
  try {
    const promotion = await db.promotion.findMany({});
    return promotion;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
}

export const getPromotions = cacheData(
  fetchPromotions,
  ["getPromotions"], // Cache key
  { revalidate: 3600 } // Revalidate every 120 seconds
);