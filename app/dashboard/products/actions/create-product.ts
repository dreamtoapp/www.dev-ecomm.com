"use server";
import { ImageToCloudinary } from "@/lib/cloudinary/uploadImageToCloudinary";
import db from "../../../../lib/prisma";
import { prepareProductData } from "./prepare-product-data";
import { Slugify } from "@/utils/slug";
import { revalidatePath } from "next/cache";

/**
 * Creates a new product.
 */
export async function createProduct(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const price = parseFloat(formData.get("price") as string);
  const size = formData.get("size") as string | null;
  const details = formData.get("details") as string | null;
  const image = formData.get("image") as File | null;
  const supplierId = formData.get("supplierId") as string;
 let imageUrl = ""
 if (image) {
    const imageUrlData = await ImageToCloudinary(
      image,
      process.env.CLOUDINARY_UPLOAD_PRESET_PRODUCTS || ""
    );

    imageUrl = imageUrlData.result?.secure_url ?? "";
  }


  const offerData = {
    name: name ,
    price: price,
    size: size ,
    details: details,
    slug: Slugify(name),
    imageUrl: imageUrl,
    supplierId: supplierId,
  };

  try {
    await db.product.create({ data: offerData });
    revalidatePath("/dashboard/products");
    revalidatePath("/dashboard/products-control");
    revalidatePath("/")
    return { success: true, message: "Product created successfully" };
  } catch (error: any) {
    console.error("Error creating product:", error);
    throw new Error("Failed to create product.");
  }

  try {
    const productData = await prepareProductData(formData);
    await db.product.create({ data: productData });
    return { success: true, message: "Product created successfully" };
  } catch (error: any) {
    console.error("Error creating product:", error);
    throw new Error("Failed to create product.");
  }
}
