"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { Product } from "@/types/product";

interface StoreAddToCartButtonProps {
  product: Product;
  quantity?: number;
  inStock?: boolean;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export default function StoreAddToCartButton({
  product,
  quantity = 1,
  inStock = true,
  variant = "default",
  size = "default",
  className,
}: StoreAddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { addItem } = useCartStore();

  const handleAddToCart = async () => {
    if (!inStock) return;

    try {
      setIsLoading(true);

      // Add to cart using Zustand store
      addItem(product, quantity);

      // Show success state
      setIsAdded(true);

      // Show toast
      toast.success("تمت إضافة المنتج إلى السلة", {
        description: product.name,
      });

      // Reset success state after a delay
      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("حدث خطأ أثناء الإضافة إلى السلة");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleAddToCart}
      disabled={isLoading || !inStock || isAdded}
      className={cn(
        isAdded && "bg-green-600 hover:bg-green-700",
        !inStock && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {isAdded ? (
        <>
          <Check className={cn(
            "h-5 w-5",
            size === "sm" && "h-4 w-4",
            size === "lg" && "h-5 w-5"
          )} />
          {size !== "icon" && <span className="mr-2">تمت الإضافة</span>}
        </>
      ) : (
        <>
          <ShoppingCart className={cn(
            "h-5 w-5",
            size === "sm" && "h-4 w-4",
            size === "lg" && "h-5 w-5"
          )} />
          {size !== "icon" && (
            <span className="mr-2">
              {!inStock ? "غير متوفر" : "إضافة إلى السلة"}
            </span>
          )}
        </>
      )}
    </Button>
  );
}
