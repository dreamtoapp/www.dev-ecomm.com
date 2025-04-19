"use client";
import React, {
  useEffect,
  useState,
} from 'react';

import {
  FaCompress,
  FaExpand,
} from 'react-icons/fa6';

import NoData from '@/app/(e-comm)/homepage/component/product/NoProduct';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cartStore';
import { Product } from '@/types/product';

import ProductSkeleton from '../ProductSkeleton';
import ProductCard from './ProductCard';

export default function ProductList({ products }: { products: Product[] }) {
  console.log("Debug: Rendering ProductList with products:", products);
  if (!products || products.length === 0) {
    return <NoData message="لا توجد منتجات متاحة" />;
  }

  const { addItem, cart } = useCartStore();
  const [quantities, setQuantities] = useState<{ [key: string]: number }>(
    products.reduce((acc, product) => ({ ...acc, [product.id]: 1 }), {})
  );
  const [notifications, setNotifications] = useState<{
    [key: string]: boolean;
  }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSingleColumn, setIsSingleColumn] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const updateQuantity = (productId: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, prev[productId] + delta),
    }));
  };

  const handleAddToCart = (
    productId: string,
    quantity: number,
    product: Product
  ) => {
    addItem(product, quantity);
    setNotifications((prev) => ({ ...prev, [productId]: true }));
    setTimeout(() => {
      setNotifications((prev) => ({ ...prev, [productId]: false }));
    }, 2000);
  };

  if (isLoading) return <ProductSkeleton count={products.length} />;

  return (
    <div className="container mx-auto p-4">
      <div className="sm:hidden flex justify-center mb-6">
        <Button
          onClick={() => setIsSingleColumn(!isSingleColumn)}
          className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-md rounded-full flex items-center gap-2"
        >
          {isSingleColumn ? <FaExpand size={16} /> : <FaCompress size={16} />}
          {isSingleColumn ? "عرض أكثر" : "عرض أقل"}
        </Button>
      </div>

      <div
        className={`grid gap-6 ${isSingleColumn ? "grid-cols-1" : "grid-cols-2"
          } sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`}
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            quantity={quantities[product.id]}
            onQuantityChange={updateQuantity}
            onAddToCart={handleAddToCart}
            isInCart={!!cart[product.id]}
            showNotification={!!notifications[product.id]}
          />
        ))}
      </div>
    </div>
  );
}
