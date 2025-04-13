// lib/actions.ts
"use server";

import { GlobalSEO } from "@prisma/client";
import db from "../../../../lib/prisma";

export const getSEOData = async (
  entityId: string
): Promise<GlobalSEO | null> => {
  try {
    return await db.globalSEO.findUnique({
      where: { entityId },
      include: {
        socialMedia: true,
        technicalSEO: true,
        localization: true,
      },
    });
  } catch (error) {
    console.error("Error fetching SEO data:", error);
    return null;
  }
};
