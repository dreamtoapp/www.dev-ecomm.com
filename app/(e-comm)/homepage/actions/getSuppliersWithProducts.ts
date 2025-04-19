"use server"
import { cacheData } from '@/lib/cache';
import db from '@/lib/prisma';

async function getSuppliersWithProducts() {
  const offerData = await db.supplier.findMany({
    where: { type: "offer" },
    include: {
      _count: {
        select: {
          products: {
            where: { published: true },
          },
        },
      },
    },
  });

  const companyData = await db.supplier.findMany({
    where: { type: "company" },
    include: {
      _count: {
        select: {
          products: {
            where: { published: true },
          },
        },
      },
    },
  });

  return { offerData, companyData };
}

export const fetchSuppliersWithProducts = cacheData(
  getSuppliersWithProducts,
  ["fetchSuppliersWithProducts"], // Cache key
  { revalidate: 3600 } // Revalidate every 120 seconds
);


