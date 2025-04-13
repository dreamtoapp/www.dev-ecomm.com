"use client";
import {
  useEffect,
  useMemo,
  useState,
} from 'react'

import { useRouter } from 'next/navigation'

import { useCartStore } from '@/store/cartStore'

import CartItemsList from './component/cart-items-List'
import CartSummarySection from './component/cart-summary-section'
import CheckOutSection from './component/check-out-section'
import EmptyCart from './component/empty-cart'

export default function CartPage() {
  const { getTotalItems, getTotalPrice, cart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // حساب المجموع مع الضريبة
  const totalWithTax = useMemo(() => {
    const total = getTotalPrice();
    return total + total * 0.15; // إضافة 15% ضريبة القيمة المضافة
  }, [cart, getTotalPrice]);

  useEffect(() => {
    setMounted(true);
    // Simulate data loading
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulate 2 seconds loading time
  }, []);

  if (!mounted) return null;



  return (
    <div className="p-8 bg-background min-h-screen flex flex-col items-center space-y-6 rounded-t-3xl">
      {/* إذا كانت السلة فارغة */}
      {getTotalItems() === 0 ? (
        <EmptyCart />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr] gap-8 w-full max-w-7xl">
          {/* قائمة المنتجات في السلة */}
          <CartItemsList cart={cart} isLoading={isLoading} />

          {/* ملخص السلة */}
          <CartSummarySection isLoading={isLoading} />
        </div>
      )}

      {/* زر متابعة عملية الشراء في الأسفل */}
      <CheckOutSection
        isLoading={isLoading}
        totalWithTax={totalWithTax}
        getTotalItems={getTotalItems}
      />
    </div>
  );
}
