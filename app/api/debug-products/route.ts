import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    // Get the first 20 products with their slugs
    const products = await db.product.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
      },
      take: 20,
    });

    return NextResponse.json({
      products,
      count: products.length,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
