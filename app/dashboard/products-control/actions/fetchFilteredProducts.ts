"use server";
import db from '@/lib/prisma';
import { ProductType } from "@/types/ProductType";

interface FilterParams {
  name?: string;
  supplierId?: string | null;
  status?: string; // "published", "unpublished", "all"
  type?: string; // "company", "offer", "all"
  stock?: string; // "all", "in", "out"
  page?: number;
  pageSize?: number;
}

export async function fetchFilteredProducts(filters: FilterParams): Promise<{ products: ProductType[]; total: number }> {
  const where: any = {};
  if (filters.name) {
    where.name = { contains: filters.name, mode: 'insensitive' };
  }
  if (filters.supplierId) {
    where.supplierId = filters.supplierId;
  }
  if (filters.status && filters.status !== 'all') {
    where.published = filters.status === 'published';
  }
  if (filters.type && filters.type !== 'all') {
    where.supplier = { ...(where.supplier || {}), type: filters.type };
  }
  if (filters.stock && filters.stock !== 'all') {
    where.outOfStock = filters.stock === 'out';
  }

  const page = filters.page ?? 1;
  const pageSize = filters.pageSize ?? 10;

  const [products, total] = await Promise.all([
    db.product.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: { supplier: true },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    db.product.count({ where }),
  ]);

  // Map products to ensure imageUrl is always a string (never null)
  const mappedProducts: ProductType[] = products.map((p: any) => ({
    ...p,
    imageUrl: p.imageUrl ?? '', // fallback to empty string if null
  }));

  return { products: mappedProducts, total };
}
