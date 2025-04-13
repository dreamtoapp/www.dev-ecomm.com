"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { DollarSign, Check } from "lucide-react";
import { FaCartPlus } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { Product } from "@/types/product";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton"; // For loading states

// Skeleton Component
const ProductSkeleton = ({ count }: { count: number }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
    {Array.from({ length: count }).map((_, index) => (
      <div
        key={index}
        className="rounded-2xl shadow-md overflow-hidden relative bg-card border border-border animate-pulse"
      >
        {/* Image Placeholder */}
        <div className="w-full h-40 bg-muted rounded-t-2xl"></div>

        {/* Content Placeholder */}
        <div className="space-y-2 p-4 text-center">
          {/* Product Name Placeholder */}
          <div className="h-4 bg-muted rounded w-3/4 mx-auto"></div>

          {/* Price Placeholder */}
          <div className="h-4 bg-muted rounded w-1/2 mx-auto mt-2"></div>

          {/* Quantity Buttons Placeholder */}
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="w-8 h-8 bg-muted rounded-full"></div>
            <div className="w-8 h-8 bg-muted rounded-full"></div>
          </div>

          {/* Total Price Placeholder */}
          <div className="mt-2 bg-muted p-2 rounded-lg shadow-sm">
            <div className="h-4 bg-muted-foreground/20 rounded w-1/2 mx-auto"></div>
          </div>
        </div>

        {/* Add to Cart Button Placeholder */}
        <div className="p-4 flex justify-center items-center">
          <div className="w-24 h-10 bg-muted rounded-full"></div>
        </div>
      </div>
    ))}
  </div>
);

export default function ProductList({ products }: { products: Product[] }) {
  const { addItem, removeItem, cart } = useCartStore();

  // State for tracking quantities
  const [quantities, setQuantities] = useState<{ [key: string]: number }>(
    products.reduce((acc, product) => ({ ...acc, [product.id]: 1 }), {})
  );

  // State for tracking notifications inside each card
  const [notifications, setNotifications] = useState<{
    [key: string]: boolean;
  }>({});

  // State for simulating loading
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading for 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Function to update quantity
  const updateQuantity = (productId: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, prev[productId] + delta), // Ensure quantity >= 1
    }));
  };

  // Function to handle adding to cart and showing notification/checkmark
  const handleAddToCart = (
    productId: string,
    quantity: number,
    product: Product
  ) => {
    addItem(product, quantity);

    // Show the temporary notification
    setNotifications((prev) => ({ ...prev, [productId]: true }));

    // Hide the notification after 2 seconds
    setTimeout(() => {
      setNotifications((prev) => ({ ...prev, [productId]: false }));
    }, 2000);
  };

  // Render skeleton if loading
  if (isLoading) {
    return <ProductSkeleton count={products.length} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {products.map((product) => (
        <Card
          key={product.id}
          className="rounded-2xl shadow-md overflow-hidden relative bg-card border-border"
        >
          {/* Persistent Checkmark */}
          {cart[product.id] && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute top-2 right-2 z-10 bg-green-500 text-white rounded-full p-2 shadow-lg"
            >
              <Check size={16} />
            </motion.div>
          )}

          {/* Temporary Notification */}
          <AnimatePresence>
            {notifications[product.id] && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
              >
                <span className="text-sm font-medium">تمت الإضافة!</span>
                <Check
                  size={16}
                  className="text-green-600 dark:text-green-400"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Product Image */}
          <CardHeader className="p-0 relative">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={300}
              height={200}
              className="w-full h-40 object-cover rounded-t-2xl transition-transform duration-300 hover:scale-105"
              priority
            />
          </CardHeader>

          <CardContent className="space-y-2 p-4 text-center">
            {/* Product Name */}
            <CardTitle className="text-base font-bold text-foreground">
              {product.name}
            </CardTitle>
            {/* Product Description */}
            <CardDescription className="text-muted-foreground">
              {product.details}
            </CardDescription>

            {/* Price */}
            <div className="flex justify-between items-center text-sm font-semibold text-foreground">
              <div className="flex items-center gap-2">
                <DollarSign size={16} className="text-amber-500" />
                <span>{product.price.toFixed(2)} $</span>
              </div>
            </div>

            {/* Quantity Buttons */}
            <div className="flex items-center justify-center gap-2 mt-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateQuantity(product.id, -1)}
                className="w-8 h-8 text-sm border border-border hover:bg-accent transition-colors duration-200 rounded-full"
              >
                -
              </Button>
              <span className="text-sm font-medium text-foreground">
                {quantities[product.id]}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateQuantity(product.id, 1)}
                className="w-8 h-8 text-sm border border-border hover:bg-accent transition-colors duration-200 rounded-full"
              >
                +
              </Button>
            </div>

            {/* Total Price */}
            <div className="mt-2 bg-accent p-2 rounded-lg shadow-sm">
              <div className="flex items-center justify-center gap-2 text-sm font-semibold text-foreground">
                <span>الإجمالي:</span>
                <span>
                  ${(quantities[product.id] * product.price).toFixed(2)}
                </span>
              </div>
            </div>
          </CardContent>

          {/* Add to Cart Button */}
          <CardFooter className="p-4 flex justify-center items-center">
            <Button
              onClick={() =>
                handleAddToCart(product.id, quantities[product.id], product)
              }
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-md rounded-full"
            >
              <FaCartPlus size={16} className="mr-2" />
              أضف إلى السلة
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
