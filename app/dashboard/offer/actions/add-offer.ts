"use server"
import { revalidatePath } from 'next/cache';

import db from '@/lib/prisma';
import { ImageToCloudinary } from '@/lib/cloudinary/uploadImageToCloudinary';
import { Slugify } from '@/utils/slug';

export async function createOffer(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const id = formData.get("id") as string;
  const logoFile = formData.get('logo') as File || null;
  let imageUrl = ""

  if (logoFile) {
    const imageUrlData = await ImageToCloudinary(
      // formData.get("logo") as File,
      logoFile,
      process.env.CLOUDINARY_UPLOAD_PRESET_SUPPLIER || ""
    );

    imageUrl = imageUrlData.result?.secure_url ?? "";
  }

  


  const supplierData = {
    name: name,
    slug: Slugify(name),
    type: "offer",
    ...(imageUrl ? { logo: imageUrl } : {}), // Only include logo if imageUrl is not empty
  };

  try {
    const updateData = await db.supplier.create({
      data: supplierData,
    });

    console.log({ updateData })

    revalidatePath("/dashboard/suppliers");
    revalidatePath("/");
    return { success: true, message: "تم تحديث المعلومات" };

  } catch (error: any) {
    console.error("Error updating supplier:", error);
    throw new Error("Failed to update supplier data.");
  }
}














// "use server"
// import { revalidatePath } from 'next/cache';

// import db from '@/lib/prisma';
// import { ImageToCloudinary } from '@/lib/cloudinary/uploadImageToCloudinary';
// import { Slugify } from '@/utils/slug';

// export async function createSupplier(
//   data: any,
//   logoFile?: File | null
// ) {
//   let logoUrl = data.logo || null; // Initialize with existing value if any
//   let publicId = data.publicId || null;

//   // Handle logo upload if file is provided
//   if (logoFile) {
//     try {
//       const cloudinaryResponse = await ImageToCloudinary(
//         logoFile,
//         process.env.CLOUDINARY_UPLOAD_PRESET_SUPPLIER || ""
//       );
//       logoUrl = cloudinaryResponse.secure_url;
//       publicId = cloudinaryResponse.public_id;
//     } catch (error: any) {
//       console.error("Error uploading image to Cloudinary:", error.message);
//       throw new Error("Failed to upload supplier logo");
//     }
//   }

//   // Prepare supplier data
//   const supplierData = {
//     ...data,
//     slug: Slugify(data.name), // Generate slug from name
//     logo: logoUrl,
//     publicId: publicId,
//   };

//   try {
//     // Create new supplier record
//     const newSupplier = await db.supplier.create({
//       data: supplierData,
//     });

//     // Revalidate paths
//     revalidatePath("/dashboard/suppliers");
//     revalidatePath("/");

//     return newSupplier; // Return created record

//   } catch (error: any) {
//     console.error("Error creating supplier:", error);

//     // Handle unique constraint violations
//     if (error.code === 'P2002') {
//       throw new Error("Supplier name or slug already exists");
//     }

//     throw new Error("Failed to create supplier");
//   }
// }