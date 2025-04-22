"use server";
import { uploadImageToCloudinary } from "../../../../lib/cloudinary";
import db from "../../../../lib/prisma";
import { ImageToCloudinary } from "../../../../lib/cloudinary/uploadImageToCloudinary";

/**
 * Helper function to upload an image to Cloudinary.
 */
async function uploadImage(
  imageFile: File
): Promise<{ secure_url: string; public_id: string }> {
  try {
    const cloudinaryResponse = await uploadImageToCloudinary(
      imageFile,
      process.env.CLOUDINARY_UPLOAD_PRESET_PRODUCTS || ""
    );
    return {
      secure_url: cloudinaryResponse.secure_url,
      public_id: cloudinaryResponse.public_id,
    };
  } catch (error: any) {
    console.error("Error uploading image to Cloudinary:", error.message);
    throw new Error("Failed to upload image to Cloudinary.");
  }
}

/**
 * Helper function to prepare product data with optional image handling.
 */
async function prepareProductData(data: any, imageFile?: File): Promise<any> {
  let imageUrl = data.imageUrl; // Existing image URL (if any)
  let publicId = data.publicId; // Existing public ID (if any)

  // Upload the image to Cloudinary if a file is provided
  if (imageFile) {
    const { secure_url, public_id } = await ImageToCloudinary(
      imageFile,
      process.env.CLOUDINARY_UPLOAD_PRESET_PRODUCTS || ""
    );

    // const { secure_url, public_id } = await uploadImage(imageFile);
    imageUrl = secure_url;
    publicId = public_id;
  }

  // Return the updated product data
  return {
    ...data,
    imageUrl: imageUrl, // Update the image URL
    publicId: publicId, // Update the public ID
  };
}

/**
 * Fetches all products and supplier details for a specific supplier.
 */
export async function getProductsBySupplier(supplierId: string) {
  try {
    const supplier = await db.supplier.findUnique({
      where: { id: supplierId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        logo: true,

        products: {
          select: {
            id: true,
            name: true,
            price: true,
            size: true,
            details: true,
            imageUrl: true,
          },
        },
      },
    });

    if (!supplier) {
      return {
        success: false,
        message: "Supplier not found.",
      };
    }

    return {
      success: true,
      data: supplier,
    };
  } catch (error: any) {
    console.error("Error fetching supplier and products:", error);
    return {
      success: false,
      message: "Failed to fetch supplier and products.",
    };
  }
}

/**
 * Fetches a single product by its ID.
 */
export async function getProductById(productId: string) {
  try {
    const product = await db.product.findUnique({
      where: { id: productId },
      select: {
        id: true,
        name: true,
        price: true,
        supplierId: true,
      },
    });

    if (!product) {
      throw new Error("Product not found.");
    }

    return product;
  } catch (error: any) {
    console.error("Error fetching product:", error);
    throw new Error("Failed to fetch product.");
  }
}

/**
 * Creates a new product.
 */
export async function createProduct(data: any, imageFile?: File) {
  try {
    const productData = await prepareProductData(data, imageFile);
    await db.product.create({ data: productData });
  } catch (error: any) {
    console.error("Error creating product:", error);
    throw new Error("Failed to create product.");
  }
}

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
  } catch (error: any) {
    console.error("Error updating product:", error);
    throw new Error("Failed to update product.");
  }
}

/**
 * Deletes a product by its ID.
 */
export async function deleteProduct(productId: string) {
  try {
    await db.product.delete({
      where: { id: productId },
    });
  } catch (error: any) {
    console.error("Error deleting product:", error);
    throw new Error("Failed to delete product.");
  }
}
