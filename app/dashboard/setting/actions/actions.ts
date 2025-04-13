"use server";
import db from "@/lib/prisma";

// Define the Company type for type safety
interface Company {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  profilePicture: string;
  bio: string;
  taxNumber: string;
  taxQrImage: string;
  twitter: string;
  linkedin: string;
  instagram: string;
  tiktok: string;
  facebook: string;
  snapchat: string;
  website: string;
  address: string;
  latitude: string;
  longitude: string;
}

// Helper function to extract and format form data
const collectData = (formData: FormData): Partial<Company> => {
  const data = Object.fromEntries(formData.entries());
  return {
    fullName: String(data.fullName || ""),
    email: String(data.email || ""),
    phoneNumber: String(data.phoneNumber || ""),
    profilePicture: String(data.profilePicture || ""),
    bio: String(data.bio || ""),
    taxNumber: String(data.taxNumber || ""),
    taxQrImage: String(data.taxQrImage || ""),
    twitter: String(data.twitter || ""),
    linkedin: String(data.linkedin || ""),
    instagram: String(data.instagram || ""),
    tiktok: String(data.tiktok || ""),
    facebook: String(data.facebook || ""),
    snapchat: String(data.snapchat || ""),
    website: String(data.website || ""),
    address: String(data.address || ""),
    latitude: String(data.latitude || ""),
    longitude: String(data.longitude || ""),
  };
};

// Fetch the single company record
export const fetchCompany = async (): Promise<Company | null> => {
  try {
    return await db.company.findFirst();
  } catch (error) {
    console.error("Error fetching company:", error);
    throw new Error("Failed to fetch company.");
  }
};

// Create or update the single company record
export const saveCompany = async (formData: FormData): Promise<void> => {
  try {
    const companyData = collectData(formData);
    const existingCompany = await db.company.findFirst();

    if (existingCompany) {
      // Update the existing company
      await db.company.update({
        where: { id: existingCompany.id },
        data: companyData,
      });
    } else {
      // Create a new company
      await db.company.create({ data: companyData });
    }
  } catch (error) {
    console.error("Error saving company:", error);
    throw new Error("Failed to save company.");
  }
};
