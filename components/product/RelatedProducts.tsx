"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getRelatedProducts } from "@/app/(e-comm)/product/actions/related";

interface Product {
  id: string;
  name: string;
  price: number;
  salePrice?: number | null;
  imageUrl: string;
  rating?: number | null;
  reviewCount?: number | null;
  inStock: boolean;
}

interface RelatedProductsProps {
  currentProductId: string;
  supplierId?: string;
}

export default function RelatedProducts({ currentProductId, supplierId }: RelatedProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRelatedProducts() {
      try {
        if (!supplierId) {
          setLoading(false);
          return;
        }

        // Fetch related products using server action
        const relatedProducts = await getRelatedProducts(supplierId, currentProductId, 4);
        setProducts(relatedProducts);
      } catch (error) {
        console.error("Error fetching related products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRelatedProducts();
  }, [currentProductId, supplierId]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="h-80 bg-muted animate-pulse rounded-md"></div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
