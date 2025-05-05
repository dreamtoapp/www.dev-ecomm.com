"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { addToCart } from "@/app/(e-comm)/actions/cart";

interface AddToCartButtonProps {
  productId: string;
  name: string;
  price: number;
  image: string;
  inStock?: boolean;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export default function AddToCartButton({
  productId,
  name,
  price,
  image,
  inStock = true,
  variant = "default",
  size = "default",
  className,
}: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = async () => {
    if (!inStock) return;

    try {
      setIsLoading(true);

      // Call the server action to add to cart
      const result = await addToCart({
        productId,
        name,
        price,
        image,
      });

      if (result.success) {
        // Show success state
        setIsAdded(true);

        // Show toast
        toast.success(result.message, {
          description: name,
        });

        // Reset success state after a delay
        setTimeout(() => {
          setIsAdded(false);
        }, 2000);
      } else {
        toast.error(result.message);
      }
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
