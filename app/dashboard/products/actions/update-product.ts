"use server";
import { revalidatePath } from "next/cache";
import db from "../../../../lib/prisma";
import { prepareProductData } from "./prepare-product-data";

/**
 * Updates an existing product.
 */
export async function updateProduct(
  productId: string,
  data: any,
  imageFile?: any
) {
  try {
    const productData = await prepareProductData(data, imageFile);
    await db.product.update({
      where: { id: productId },
      data: productData,
    });
    revalidatePath("/dashboard/products");
    revalidatePath("/dashboard/products-control");
    revalidatePath("/");
    return { success: true, message: "Product updated successfully" };
  } catch (error: any) {
    console.error("Error updating product:", error);
    throw new Error("Failed to update product.");
  }
}
