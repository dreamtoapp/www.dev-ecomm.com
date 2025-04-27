"use client";
import { useState } from "react";
import PublishStatusButton from "./PublishStatusButton";
import StockStatusButton from "./StockStatusButton";

interface Product {
  id: string;
  name: string;
  published: boolean;
  outOfStock: boolean;
}

interface ProductStatusControlProps {
  product: Product;
}

export default function ProductStatusControl({ product }: ProductStatusControlProps) {
  const [published, setPublished] = useState(product.published);
  const [outOfStock, setOutOfStock] = useState(product.outOfStock);
  const [dialog, setDialog] = useState<null | "publish" | "unpublish" | "stock" | "restock">(null);

  const handlePublish = (publish: boolean) => {
    setPublished(publish);
    handleConfirm(publish ? "publish" : "unpublish");
  };

  const handleStock = (stock: boolean) => {
    setOutOfStock(stock);
    handleConfirm(stock ? "stock" : "restock");
  };

  const handleConfirm = (action: "publish" | "unpublish" | "stock" | "restock") => {
    setDialog(null);
    // Call server logic here
  };

  return (
    <div className="flex gap-2">
      <PublishStatusButton
        published={published}
        productName={product.name}
        productId={product.id}
        onStatusChange={handlePublish}
      />
      <StockStatusButton
        outOfStock={outOfStock}
        productName={product.name}
        productId={product.id}
        onStatusChange={handleStock}
      />
    </div>
  );
}
