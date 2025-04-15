// lib/cloudinary.ts
import cloudinary from "cloudinary";

// Configure Cloudinary using environment variables
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


 

// Interface for Cloudinary upload response
export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
}



export async function ImageToCloudinary(
  imageFile: string | Blob,
  uploadPreset: string | Blob,
 ): Promise<CloudinaryUploadResult> {

  if (!process.env.CLOUDINARY_CLOUD_NAME) {
    throw new Error('Cloudinary cloud name is not configured');
  }

  if (!uploadPreset) {
    throw new Error('Upload preset is required');
  }

  // Prepare form data
  const formData = new FormData();
  formData.append('file', imageFile);
  formData.append('upload_preset', uploadPreset);
  
  // Add folder if provided
 

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Cloudinary upload failed');
    }

    const data = await response.json();

    // Validate response structure
    if (!data.secure_url || !data.public_id) {
      throw new Error('Invalid response from Cloudinary');
    }

    return {
      secure_url: data.secure_url,
      public_id: data.public_id,
    };
  } catch (error: any) {
    console.error('Cloudinary upload error:', error);
    throw new Error(`Image upload failed: ${error.message}`);
  }
}

