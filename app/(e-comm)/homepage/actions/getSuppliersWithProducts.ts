"use server"
import { cacheData } from '@/lib/cache';
import db from '@/lib/prisma';

async function getSuppliersWithProducts(sid?: string) {
  const where = sid ? { id: sid } : {};
  return await db.supplier.findMany({
    where,
    include: {
      _count: { select: { products: { where: { published: true } } } },
    },
  });
}

export const fetchSuppliersWithProducts = cacheData(
  getSuppliersWithProducts,
  ["fetchSuppliersWithProducts"], // Cache key
  { revalidate: 3600 } // Revalidate every 120 seconds
);









// "use server";
// import { cacheData } from '@/lib/cache';
// import db from '@/lib/prisma';

// // Helper function to fetch suppliers with products
// async function fetchSuppliersWithProducts(sid?: string) {
//   try {
//     const suppliersWithProducts = await db.supplier.findMany({
//       where: {
//         id: sid ? sid : undefined, // Filter by supplierId if sid is provided
//       },
//       include: {
//         _count: {
//           select: {
//             products: {
//               where: {
//                 published: true, // Count only published products
//               },
//             },
//           },
//         },
//       },
//     });

//     return suppliersWithProducts;
//   } catch (error) {
//     console.error("Error fetching suppliers with products:", error);
//     throw new Error("Failed to fetch suppliers with products");
//   }
// }

// export const getSuppliersWithProducts = cacheData(
//   fetchSuppliersWithProducts,
//   ['getSuppliersWithProducts'],  // Cache key
//   { revalidate: 3600 } // Revalidate every 180 seconds
// );


