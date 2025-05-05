"use client";

import {
  useEffect,
  useState,
} from 'react';

import { Heart } from 'lucide-react';
import { toast } from 'sonner';

import {
  addToWishlist,
  isProductInWishlist,
  removeFromWishlist,
} from '@/app/(e-comm)/product/[slug]/actions';
import { cn } from '@/lib/utils';

interface WishlistButtonProps {
  productId: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  showBackground?: boolean;
}

export default function WishlistButton({
  productId,
  className,
  size = "md",
  showBackground = true,
}: WishlistButtonProps) {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  // Icon size based on the size prop
  const iconSize = {
    sm: 18,
    md: 22,
    lg: 26,
  }[size];

  // Background size based on the size prop
  const bgSize = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  }[size];

  // Check if the product is in the wishlist on component mount
  useEffect(() => {
    const checkWishlist = async () => {
      try {
        console.log("Checking wishlist for product:", productId);
        const result = await isProductInWishlist(productId);
        console.log("Wishlist check result:", result);
        setIsInWishlist(result);
      } catch (error) {
        console.error("Error checking wishlist:", error);
      } finally {
        setIsInitializing(false);
      }
    };

    checkWishlist();
  }, [productId]);

  const handleToggleWishlist = async () => {
    if (isLoading) return;

    setIsLoading(true);
    console.log("Toggle wishlist for product:", productId, "Current state:", isInWishlist);

    try {
      if (isInWishlist) {
        console.log("Removing from wishlist...");
        const result = await removeFromWishlist(productId);
        console.log("Remove result:", result);

        if (result.success) {
          setIsInWishlist(false);
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      } else {
        console.log("Adding to wishlist...");
        const result = await addToWishlist(productId);
        console.log("Add result:", result);

        if (result.success) {
          setIsInWishlist(true);
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
      toast.error("حدث خطأ أثناء تحديث المفضلة");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggleWishlist}
      disabled={isLoading || isInitializing}
      className={cn(
        "relative transition-all duration-200 flex items-center justify-center",
        isLoading && "opacity-70",
        className
      )}
      aria-label={isInWishlist ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
    >
      {showBackground && (
        <div
          className={cn(
            bgSize,
            "absolute inset-0 rounded-full bg-white/90 backdrop-blur-sm shadow-sm -z-10",
            isInWishlist && "bg-red-50"
          )}
        />
      )}

      <Heart
        size={iconSize}
        className={cn(
          "transition-all duration-200",
          isInWishlist
            ? "fill-red-500 text-red-500"
            : "text-gray-500 hover:text-red-500"
        )}
      />
    </button>
  );
}
