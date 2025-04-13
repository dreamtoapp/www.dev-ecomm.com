"use server";

import { revalidatePath } from "next/cache";
import db from "@/lib/prisma";
import { z } from "zod";
import { IndustryType } from "@prisma/client";

// Define validation schema for SEO form data
const seoFormSchema = z.object({
  entityId: z.string().min(1, "Entity ID is required"),
  industryType: z.nativeEnum(IndustryType),
  metaTitle: z.string().max(120, "Title must be 120 characters or less"),
  metaDescription: z
    .string()
    .max(320, "Description must be 320 characters or less"),
  canonicalUrl: z.string().url("Must be a valid URL").optional().nullable(),
  robots: z.string(),
  keywords: z.array(z.string()),

  // Social Media
  openGraphTitle: z.string().optional().nullable(),
  openGraphImages: z.string().optional().nullable(),
  twitterCardType: z.string().optional().nullable(),
  twitterImages: z.string().optional().nullable(),

  // Technical SEO
  securityHeaders: z.array(z.string()),
  preloadAssets: z.array(z.string()),
  httpEquiv: z.array(z.string()),

  // Localization
  defaultLanguage: z.string(),
  supportedLanguages: z.array(z.string()),
  hreflang: z.string().optional().nullable(),

  // Advanced
  schemaOrg: z.string().optional().nullable(),
  industryData: z.string().optional().nullable(),
});

export type SeoFormData = z.infer<typeof seoFormSchema>;

// Update the return type for the server actions to be more explicit
// Add this type definition at the top of the file, after the SeoFormData type

export type ServerActionResult =
  | { success: true; data: any }
  | { success: false; errors: Record<string, string[]> };

// Then update the createSeoEntry function to use this type
export async function createSeoEntry(
  formData: SeoFormData
): Promise<ServerActionResult> {
  try {
    // Validate form data
    const validatedData = seoFormSchema.parse(formData);

    // Process JSON fields
    const openGraphImages = validatedData.openGraphImages
      ? JSON.parse(validatedData.openGraphImages)
      : null;
    const twitterImages = validatedData.twitterImages
      ? JSON.parse(validatedData.twitterImages)
      : null;
    const hreflang = validatedData.hreflang
      ? JSON.parse(validatedData.hreflang)
      : null;
    const schemaOrg = validatedData.schemaOrg
      ? JSON.parse(validatedData.schemaOrg)
      : null;
    const industryData = validatedData.industryData
      ? JSON.parse(validatedData.industryData)
      : null;

    // Create SEO entry
    const newEntry = await db.globalSEO.create({
      data: {
        entityId: validatedData.entityId,
        industryType: validatedData.industryType,
        metaTitle: validatedData.metaTitle,
        metaDescription: validatedData.metaDescription,
        canonicalUrl: validatedData.canonicalUrl,
        robots: validatedData.robots,
        keywords: validatedData.keywords,

        socialMedia: {
          openGraphTitle: validatedData.openGraphTitle,
          openGraphImages,
          twitterCardType: validatedData.twitterCardType,
          twitterImages,
        },

        technicalSEO: {
          securityHeaders: validatedData.securityHeaders,
          preloadAssets: validatedData.preloadAssets,
          httpEquiv: validatedData.httpEquiv,
        },

        localization: {
          defaultLanguage: validatedData.defaultLanguage,
          supportedLanguages: validatedData.supportedLanguages,
          hreflang,
        },

        schemaOrg,
        industryData,
      },
    });

    revalidatePath("/seo");
    return { success: true, data: newEntry };
  } catch (error) {
    if (error instanceof z.ZodError) {
      // return { success: false, errors: error.flatten().fieldErrors };
    }

    console.error("Failed to create SEO entry:", error);
    return {
      success: false,
      errors: { _form: ["Failed to create SEO entry"] },
    };
  }
}

// Also update the updateSeoEntry function to use the same return type
export async function updateSeoEntry(
  id: string,
  formData: SeoFormData
): Promise<ServerActionResult> {
  try {
    // Validate form data
    const validatedData = seoFormSchema.parse(formData);

    // Process JSON fields
    const openGraphImages = validatedData.openGraphImages
      ? JSON.parse(validatedData.openGraphImages)
      : null;
    const twitterImages = validatedData.twitterImages
      ? JSON.parse(validatedData.twitterImages)
      : null;
    const hreflang = validatedData.hreflang
      ? JSON.parse(validatedData.hreflang)
      : null;
    const schemaOrg = validatedData.schemaOrg
      ? JSON.parse(validatedData.schemaOrg)
      : null;
    const industryData = validatedData.industryData
      ? JSON.parse(validatedData.industryData)
      : null;

    // Update SEO entry
    const updatedEntry = await db.globalSEO.update({
      where: { id },
      data: {
        entityId: validatedData.entityId,
        industryType: validatedData.industryType,
        metaTitle: validatedData.metaTitle,
        metaDescription: validatedData.metaDescription,
        canonicalUrl: validatedData.canonicalUrl,
        robots: validatedData.robots,
        keywords: validatedData.keywords,

        socialMedia: {
          openGraphTitle: validatedData.openGraphTitle,
          openGraphImages,
          twitterCardType: validatedData.twitterCardType,
          twitterImages,
        },

        technicalSEO: {
          securityHeaders: validatedData.securityHeaders,
          preloadAssets: validatedData.preloadAssets,
          httpEquiv: validatedData.httpEquiv,
        },

        localization: {
          defaultLanguage: validatedData.defaultLanguage,
          supportedLanguages: validatedData.supportedLanguages,
          hreflang,
        },

        schemaOrg,
        industryData,
      },
    });

    revalidatePath("/seo");
    revalidatePath(`/seo/${id}`);
    return { success: true, data: updatedEntry };
  } catch (error) {
    if (error instanceof z.ZodError) {
      // return { success: false, errors: error.flatten().fieldErrors };
    }

    console.error("Failed to update SEO entry:", error);
    return {
      success: false,
      errors: { _form: ["Failed to update SEO entry"] },
    };
  }
}

// Delete an SEO entry
export async function deleteSeoEntry(id: string) {
  try {
    await db.globalSEO.delete({
      where: { id },
    });

    revalidatePath("/seo");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete SEO entry:", error);
    return { success: false, error: "Failed to delete SEO entry" };
  }
}

// Get all SEO entries
export async function getAllSeoEntries() {
  try {
    return await db.globalSEO.findMany({
      orderBy: { updatedAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch SEO entries:", error);
    throw new Error("Failed to fetch SEO entries");
  }
}

// Get a single SEO entry by ID
export async function getSeoEntryById(id: string) {
  try {
    return await db.globalSEO.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error("Failed to fetch SEO entry:", error);
    throw new Error("Failed to fetch SEO entry");
  }
}

// Get a single SEO entry by entity ID
export async function getSeoEntryByEntityId(entityId: string) {
  try {
    return await db.globalSEO.findUnique({
      where: { entityId },
    });
  } catch (error) {
    console.error("Failed to fetch SEO entry by entity ID:", error);
    throw new Error("Failed to fetch SEO entry by entity ID");
  }
}
