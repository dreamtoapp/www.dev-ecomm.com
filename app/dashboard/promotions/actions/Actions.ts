"use server";
import { uploadImageToCloudinary } from "../../../../lib/cloudinary";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import db from "../../../../lib/prisma";

export const getOfferCategory = async () => {
  const offerCategory = await db.supplier.findMany({
    where: {
      type: "offer",
    },
    select: {
      id: true,
      name: true,
    },
  });
  return offerCategory;
};

export async function createOffer(formData: FormData) {
  try {
    // Extract form data with proper type assertions
    const name = formData.get("name") as string;
    const size = formData.get("size") as string;
    const price = parseFloat(formData.get("price") as string);
    const details = formData.get("details") as string;
    const supplierId = formData.get("supplierId") as string; 
    const image = formData.get("image") as File; // Expecting image as File object

    // Validate required fields
    if (!image) throw new Error("صورة العرض مطلوبة");

    // Upload image to Cloudinary
    const imageUrl = await uploadImage(image);
    const newOffer = await db.promotion.create({
      data: {
        // name,
        // size,
        price,
        // details,
        // supplierId,
        // type: "offer",
        imageUrl: imageUrl.secure_url,
      },
    });

    // revalidatePath("/offers");
    // redirect(`/offers/${newOffer.id}`);
  } catch (error) {
    console.error("Error creating offer:", error);
    return { message: "حدث خطأ أثناء إنشاء العرض. يرجى المحاولة مرة أخرى." };
  }
}

// Helper function to upload image to Cloudinary
async function uploadImage(
  imageFile: File
): Promise<{ secure_url: string; public_id: string }> {
  const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET_SLIDER;
  if (!uploadPreset) {
    throw new Error("Cloudinary upload preset is not defined.");
  }

  console.log("Uploading image to Cloudinary...", uploadPreset, imageFile);

  try {
    // Make sure imageFile is passed correctly
    const formData = new FormData();
    formData.append('file', imageFile); // Append the file correctly
    formData.append('upload_preset', uploadPreset); // Add preset to the form

    const cloudinaryResponse = await fetch('https://api.cloudinary.com/v1_1/dhyh7aufp/image/upload', {
      method: 'POST',
      body: formData
    });

    const data = await cloudinaryResponse.json();

    // Returning the response with secure_url and public_id
    return {
      secure_url: data.secure_url,
      public_id: data.public_id,
    };
  } catch (error: any) {
    console.error("Error uploading image to Cloudinary:", error.message);
    throw new Error("Failed to upload image to Cloudinary.");
  }
}


















// "use server";
// import { uploadImageToCloudinary } from "../../../../lib/cloudinary";

// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
// import db from "../../../../lib/prisma";

// export const getOfferCategory = async () => {
//   const offerCategory = await db.supplier.findMany({
//     where: {
//       type: "offer",
//     },
//     select: {
//       id: true,
//       name: true,
//     },
//   });
//   return offerCategory;
// };

// export async function createOffer(formData: FormData) {
//   try {
//     // Extract form data with proper type assertions
//     const name = formData.get("name") as string;
//     const size = formData.get("size") as string;
//     const price = parseFloat(formData.get("price") as string);
//     const details = formData.get("details") as string;
//     const supplierId = formData.get("supplierId") as string; // Correct extraction
//     const image = formData.get("image") as File;

//     // Validate required fields
//     // if (!supplierId) throw new Error("المورد مطلوب");
//     if (!image) throw new Error("صورة العرض مطلوبة");

//     // Upload image to Cloudinary
//     const imageUrl = await uploadImage(image);

//     // Save to database
//     // const newOffer = await db.product.create({
//     //   data: {
//     //     name,
//     //     size,
//     //     price,
//     //     details,
//     //     supplierId,
//     //     type: "offer",
//     //     imageUrl: imageUrl.secure_url,
//     //   },
//     // });

//     // revalidatePath("/offers");
//     // redirect(`/offers/${newOffer.id}`);
//   } catch (error) {
//     console.error("Error creating offer:", error);
//     return { message: "حدث خطأ أثناء إنشاء العرض. يرجى المحاولة مرة أخرى." };
//   }
// }

// // Helper function to upload image to Cloudinary
// async function uploadImage(
//   imageFile: File
// ): Promise<{ secure_url: string; public_id: string }> {
//   const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET_SLIDER;
//   if (!uploadPreset) {
//     throw new Error("Cloudinary upload preset is not defined.");
//   }

//   console.log("Uploading image to Cloudinary...", uploadPreset,imageFile);
//   try {
//     const cloudinaryResponse = await uploadImageToCloudinary(
//       imageFile,
//       uploadPreset
//     );
//     return {
//       secure_url: cloudinaryResponse.secure_url,
//       public_id: cloudinaryResponse.public_id,
//     };
//   } catch (error: any) {
//     console.error("Error uploading image to Cloudinary:", error.message);
//     throw new Error("Failed to upload image to Cloudinary.");
//   }
// }
