"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { motion } from 'framer-motion'
import {
  ChevronDown,
  ChevronUp,
  DollarSign,
  Package,
  ShoppingCart,
  Tag,
} from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { useCartStore } from '@/store/cartStore'

import { formatCurrency } from '../../../../lib/formatCurrency'

const MiniCartSummary = () => {
  const [showItems, setShowItems] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // Add mount state
  const { cart, getTotalPrice, getTotalItems, getTotalUniqueItems } =
    useCartStore();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true); // Set mount state after hydration
  }, []);

  // Memoize calculations with safe defaults
  const totalPrice = useMemo(
    () => (isMounted ? getTotalPrice() : 0),
    [getTotalPrice, isMounted]
  );
  const totalWithTax = useMemo(() => totalPrice * 1.15, [totalPrice]);
  const totalUniqueItems = useMemo(
    () => (isMounted ? getTotalUniqueItems() : 0),
    [getTotalUniqueItems, isMounted]
  );

  const handleContinueShopping = useCallback(() => {
    router.push("/");
  }, [router]);

  const toggleShowItems = useCallback(() => {
    setShowItems((prev) => !prev);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-card text-foreground p-6 rounded-xl shadow-lg dark:shadow-gray-800/50 border border-gray-200 dark:border-gray-700 w-full max-w-sm"
    >
      {/* Header */}
      <div className="flex flex-row-reverse items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center">
          ملخص الطلب
          <ShoppingCart className="mr-2 h-5 w-5 text-primary" />
        </h2>
        <div className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm">
          {isMounted ? totalUniqueItems : 0} منتج
        </div>
      </div>

      {/* Summary Items - Always rendered but with safe values */}
      <div className="space-y-4">
        {/* Subtotal */}
        <div className="flex flex-row-reverse items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Tag className="h-4 w-4" />
            <span>الإجمالي الفرعي</span>
          </div>
          <span className="font-medium">
            {formatCurrency(isMounted ? totalPrice : 0)}
          </span>
        </div>

        {/* Tax */}
        <div className="flex flex-row-reverse items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <DollarSign className="h-4 w-4" />
            <span>الضريبة (15%)</span>
          </div>
          <span className="font-medium">
            {formatCurrency(isMounted ? totalWithTax - totalPrice : 0)}
          </span>
        </div>

        {/* Total */}
        <div className="flex flex-row-reverse items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            <span className="font-semibold">الإجمالي النهائي</span>
          </div>
          <span className="text-xl font-bold text-primary">
            {formatCurrency(isMounted ? totalWithTax : 0)}
          </span>
        </div>

        {/* Cart Items Toggle */}
        <Button
          className="w-full mt-4 h-10 text-sm font-semibold bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-200"
          size="sm"
          onClick={toggleShowItems}
        >
          {showItems ? "إخفاء العناصر" : "عرض العناصر"}
          {showItems ? (
            <ChevronUp className="ml-2 h-4 w-4" />
          ) : (
            <ChevronDown className="ml-2 h-4 w-4" />
          )}
        </Button>

        {/* Cart Items - Only render when mounted */}
        {isMounted && showItems && (
          <div className="mt-4 space-y-2">
            {Object.values(cart).map((item) => (
              <div
                key={item.product.id}
                className="flex flex-row-reverse items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span>{item.product.name}</span>
                  <span className="text-sm text-muted-foreground">
                    x{item.quantity}
                  </span>
                </div>
                <span className="text-sm font-medium">
                  {formatCurrency(item.product.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Checkout Button */}
        <Button
          className="w-full mt-6 h-12 text-lg font-semibold bg-primary hover:bg-primary/90 transition-all duration-200"
          size="lg"
          onClick={handleContinueShopping}
        >
          متابعة التسوق
        </Button>
      </div>
    </motion.div>
  );
};

export default MiniCartSummary;
