"use server";
import { ImageToCloudinary } from "../../../../lib/cloudinary/uploadImageToCloudinary";

/**
 * Helper function to prepare product data with optional image handling.
 */
export async function prepareProductData(data: any, imageFile?: File): Promise<any> {
  let imageUrl = data.imageUrl; // Existing image URL (if any)
  let publicId = data.publicId; // Existing public ID (if any)

 

  if (imageUrl) {
    const imageUrlData = await ImageToCloudinary(
      // formData.get("logo") as File,
      imageUrl,
      process.env.CLOUDINARY_UPLOAD_PRESET_PRODUCTS || ""
    );

    imageUrl = imageUrlData.result?.secure_url ?? "";
  }

  // if (imageFile) {
  //   const { secure_url, public_id } = await ImageToCloudinary(
  //     imageFile,
  //     process.env.CLOUDINARY_UPLOAD_PRESET_PRODUCTS || ""
  //   );
  //   imageUrl = secure_url;
  //   publicId = public_id;
  // }

  // Return the updated product data
  return {
    ...data,
    imageUrl: imageUrl, // Update the image URL
    publicId: publicId, // Update the public ID
  };
}
