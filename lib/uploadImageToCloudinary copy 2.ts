// lib/cloudinary.ts
import cloudinary from 'cloudinary';

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

  // const { valid, error } = isValidImageFile(imageFile, 2);
  // if (!valid) {
  //   console.log(error, "error")
  //   return
  // }

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

    // Optimize the secure_url with Cloudinary transformations
    const optimizedUrl = new URL(data.secure_url);
    optimizedUrl.searchParams.append('f_auto', 'true'); // Automatically choose the best format
    optimizedUrl.searchParams.append('q_auto', 'true'); // Automatically adjust quality
    optimizedUrl.searchParams.append('w', '800');       // Resize width to 800px (adjust as needed)
    optimizedUrl.searchParams.append('c_scale', 'true'); // Scale image proportionally

    return {
      secure_url: optimizedUrl.toString(), // Return the optimized URL
      public_id: data.public_id,
    };
  } catch (error: any) {
    console.error('Cloudinary upload error:', error);
    throw new Error(`Image upload failed: ${error.message}`);
  }
}


function isValidImageFile(
  imageFile: unknown,
  maxSizeMB: number = 5
): { valid: boolean, error?: string } {
  // Check for null/undefined
  if (!imageFile) {
    return { valid: false, error: 'لم يتم اختيار ملف' };
  }

  // Handle string case (existing URL)
  if (typeof imageFile === 'string') {
    // Basic URL validation
    try {
      new URL(imageFile);
    } catch {
      return { valid: false, error: 'رابط الصورة غير صالح' };
    }

    // Check image extension
    if (!/\.(jpg|jpeg|png|gif|webp)$/i.test(imageFile)) {
      return { valid: false, error: 'صيغة الصورة غير مدعومة' };
    }

    return { valid: true };
  }

  // Handle File/Blob cases
  if (!(imageFile instanceof File || imageFile instanceof Blob)) {
    return { valid: false, error: 'الملف المرفق ليس صورة' };
  }

  const file = imageFile as File;

  // Size checks
  if (file.size === 0) {
    return { valid: false, error: 'الملف فارغ أو تالف' };
  }

  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return { valid: false, error: `حجم الملف يتجاوز ${maxSizeMB} ميجابايت` };
  }

  // Type checks
  if (!file.type.startsWith('image/')) {
    return { valid: false, error: 'الملف ليس صورة' };
  }

  // Specific image type validation
  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (!validTypes.includes(file.type)) {
    return { valid: false, error: 'صيغة الصورة غير مدعومة' };
  }

  // Filename validation
  if (!file.name.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
    return { valid: false, error: 'امتداد الملف غير صالح' };
  }

  return { valid: true };
}