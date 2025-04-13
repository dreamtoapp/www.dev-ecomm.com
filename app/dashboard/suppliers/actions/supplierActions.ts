// app/dashboard/suppliers/actions/supplierActions.ts
"use server";
import db from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ImageToCloudinary } from "../../../../lib/uploadImageToCloudinary";

// Create or Update Supplier
export async function updateSupplier(id: string, data: any) {
  await db.supplier.update({
    where: { id },
    data,
  });
}
// ***********************************
// Fetch the supplier and check if it has related products
// ***********************************
export async function getSupplierDetails(id: string) {
  const supplier = await db.supplier.findUnique({
    where: { id },
    include: {
      products: true, // Include related products
    },
  });

  if (!supplier) {
    throw new Error("Supplier not found.");
  }

  return {
    supplier,
    hasProducts: supplier.products.length > 0,
  };
}

export async function deleteSupplier(
  id: string
): Promise<{ success: boolean; message: string }> {
  // Check if the supplier has any related products
  const productCount = await db.product.count({
    where: { supplierId: id },
  });

  if (productCount > 0) {
    // Return a message indicating that deletion is not possible
    return {
      success: false,
      message:
        "Cannot delete this supplier because it is linked to one or more products. Please delete the associated products first.",
    };
  }

  // If no related products, proceed with deletion
  await db.supplier.delete({
    where: { id },
  });

  // Return a success message
  return {
    success: true,
    message: "Supplier deleted successfully.",
  };
}

export async function getSuppliers() {
  try {
    const suppliers = await db.supplier.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        logo: true,
        type: true,
        publicId: true,
        _count: { select: { products: true } }, // Count of associated products
      },
    });

    return suppliers.map((supplier) => ({
      ...supplier,
      productCount: supplier._count.products, // Add product count to the supplier object
    }));
  } catch (error: any) {
    console.error("Error fetching suppliers:", error);
    throw new Error("Failed to fetch suppliers.");
  }
}

/**
 * Creates or updates a supplier.
 * @param id - The ID of the supplier (null for new suppliers).
 * @param data - The supplier data (name, email, phone, address).
 * @param logoFile - The logo file to upload (optional).
 */
export async function createOrUpdateSupplier(
  id: string | null,
  data: any,
  logoFile?: File | null
) {
  let logoUrl = data.logo; // Existing logo URL (if any)
  let publicId = data.publicId; // Existing public ID (if any)

  // Upload the logo to Cloudinary if a file is provided
  if (logoFile) {
    try {
      // const cloudinaryResponse = await uploadImageToCloudinary(
      //   logoFile,
      //   process.env.CLOUDINARY_UPLOAD_PRESET_SUPPLIER || ""
      // );
      const cloudinaryResponse = await ImageToCloudinary(
        logoFile,
        process.env.CLOUDINARY_UPLOAD_PRESET_SUPPLIER || ""
      );

      

      
      logoUrl = cloudinaryResponse.secure_url; // Save the secure URL
      publicId = cloudinaryResponse.public_id; // Save the public ID directly
    } catch (error: any) {
      console.error("Error uploading image to Cloudinary:", error.message);
      throw new Error("Failed to upload image to Cloudinary.");
    }
  }

  // Prepare the supplier data
  const supplierData = {
    ...data,
    logo: logoUrl, // Update the logo URL
    publicId: publicId, // Update the public ID
  };

  try {
    if (id) {
      // Update existing supplier
      await db.supplier.update({
        where: { id },
        data: supplierData,
      });
    } else {
      // Create new supplier
      await db.supplier.create({
        data: supplierData,
      });
    }
    revalidatePath("/dashboard/suppliers");
  } catch (error: any) {
    console.error("Error creating/updating supplier:", error);
    throw new Error("Failed to save supplier data.");
  }
}
