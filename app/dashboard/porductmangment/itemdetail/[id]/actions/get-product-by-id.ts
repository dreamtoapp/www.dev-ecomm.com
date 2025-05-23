"use server";

import { revalidatePath } from 'next/cache';

import db from '../../../../../../lib/prisma';
import { Product } from '../../../../../../types/product';

export async function getProductById(id: string) {
  try {
    const product = await db.product.findUnique({
      where: { id },
      include: { supplier: true }, // Include supplier details
    });

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Error("Failed to fetch product");
  }
}

