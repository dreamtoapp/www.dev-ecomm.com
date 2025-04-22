"use server";
import { uploadImageToCloudinary } from "../../../../lib/cloudinary";

/**
 * Helper function to upload an image to Cloudinary.
 */
export async function uploadImage(
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
