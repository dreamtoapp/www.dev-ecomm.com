import React from "react";
import { getAllProductsWithSupplier, getAllSuppliers } from "./actions/Actions";
import StickyHeader from "./components/StickyHeader";
import ProductList from "./components/ProductList";
import EmptyState from "./components/EmptyState";
import { Separator } from "../../../components/ui/separator";

interface PageProps {
  searchParams: Promise<{ supplierId?: string }>;
}

async function Page({ searchParams }: PageProps) {
  // Extract searchParams
  const params = await searchParams;

  // Fetch all suppliers
  const suppliers = await getAllSuppliers();

  // Extract supplierId from searchParams
  const supplierId = params.supplierId;

  // Fetch products based on supplierId
  const products = await getAllProductsWithSupplier(supplierId);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Sticky Header */}
      <StickyHeader suppliers={suppliers} productCount={products.length} />

      {/* Main Content */}
      <div className="p-6 space-y-8">
        {/* Products List or Empty State */}
        {products.length > 0 ? (
          <ProductList products={products} />
        ) : (
          <EmptyState />
        )}

        {/* Footer Separator */}
        <Separator className="mt-8 bg-border" />
      </div>
    </div>
  );
}

export default Page;
