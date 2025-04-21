// lib/cloudinary/config.ts

import { optimizeCloudinaryUrl } from "./optimizer";
import { formatErrorMessage, validateImageFile } from "./validator";


// lib/cloudinary/types.ts
export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
}

// lib/cloudinary/service.ts
export const ImageToCloudinary = async (
  imageFile: File | Blob | string,
  uploadPreset: string
): Promise<{ result?: CloudinaryUploadResult; error?: string }> => {
  try {
    // 1. Validate inputs
    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      return { error: formatErrorMessage('MISSING_CLOUD_CONFIG') };
    }

    if (!uploadPreset) {
      return { error: formatErrorMessage('MISSING_UPLOAD_PRESET') };
    }

    // 2. Validate image file
    const { valid, error: validationError } = await validateImageFile(imageFile);
    if (!valid) {
      return { error: formatErrorMessage(validationError || 'INVALID_IMAGE') };
    }

    // 3. Prepare request
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', uploadPreset);

    // 4. Execute request
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: 'POST', body: formData }
    );

    // 5. Handle response
    if (!response.ok) {
      return { error: formatErrorMessage('UPLOAD_FAILED') };
    }

    const data: CloudinaryUploadResult = await response.json();

    // 6. Validate response structure
    if (!data.secure_url || !data.public_id) {
      return { error: formatErrorMessage('INVALID_RESPONSE') };
    }

    // 7. Optimize URL
    return { result: optimizeCloudinaryUrl(data) };

  } catch (error: any) {
    console.error('[Cloudinary Service Error]:', error);
    return { error: formatErrorMessage(error.message) };
  }
};

// lib/cloudinary/validator.ts




// lib/cloudinary/optimizer.ts
